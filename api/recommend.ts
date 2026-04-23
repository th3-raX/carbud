import type { VercelRequest, VercelResponse } from "@vercel/node";

// Define shapes locally so we don't have issues importing from src outside standard compilation
type RecommendRequest = {
  budgetLakh: number;
  useCase: string;
  priority: string;
  bodyType: string;
};

import * as fs from "fs";
import * as path from "path";

// Allowed values for prompt injection prevention
const ALLOWED_USE_CASES = ["city", "highway", "family", "mixed"];
const ALLOWED_PRIORITIES = ["economy", "safety", "comfort", "resale"];
const ALLOWED_BODY_TYPES = ["hatchback", "sedan", "suv", "muv", "any"];

// In-memory rate limiting state (Note: resets on Vercel cold starts)
interface RateLimitInfo {
  countMin: number;
  countDay: number;
  lastMinReset: number;
  lastDayReset: number;
}
const rateLimitMap = new Map<string, RateLimitInfo>();

// Rate Limiting Configuration
const RATE_LIMIT_PER_MINUTE = 1;
const RATE_LIMIT_PER_DAY = 50;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const MINUTE = 60 * 1000;
  const DAY = 24 * 60 * 60 * 1000;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      countMin: 1,
      countDay: 1,
      lastMinReset: now,
      lastDayReset: now,
    });
    return true;
  }

  const info = rateLimitMap.get(ip)!;

  // Reset minute counter if a minute has passed
  if (now - info.lastMinReset > MINUTE) {
    info.countMin = 0;
    info.lastMinReset = now;
  }

  // Reset day counter if a day has passed
  if (now - info.lastDayReset > DAY) {
    info.countDay = 0;
    info.lastDayReset = now;
  }

  info.countMin++;
  info.countDay++;

  if (
    info.countMin > RATE_LIMIT_PER_MINUTE ||
    info.countDay > RATE_LIMIT_PER_DAY
  ) {
    return false; // Rate limit exceeded
  }

  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate Limiting Check
  const ip = (req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    "unknown") as string;
  const clientIp = Array.isArray(ip) ? ip[0] : ip.split(",")[0].trim();

  if (!checkRateLimit(clientIp)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }

  let apiKey = process.env.GROQ_API_KEY;

  // Fallback for local development if vercel dev hasn't injected the variable
  if (!apiKey) {
    try {
      const envPath = path.resolve(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf8");
        const match = envContent.match(/GROQ_API_KEY=(.*)/);
        if (match && match[1]) {
          apiKey = match[1].trim();
        }
      }
    } catch (e) {
      console.warn("Could not read .env.local manually");
    }
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const { budgetLakh, useCase, priority, bodyType } =
    req.body as RecommendRequest;

  if (
    budgetLakh === undefined ||
    useCase === undefined ||
    priority === undefined ||
    bodyType === undefined
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Strict Input Validation to Prevent Prompt Injection
  if (
    typeof budgetLakh !== "number" ||
    !ALLOWED_USE_CASES.includes(useCase) ||
    !ALLOWED_PRIORITIES.includes(priority) ||
    !ALLOWED_BODY_TYPES.includes(bodyType)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid input parameters detected." });
  }

  const budgetText =
    budgetLakh >= 50 ? "above ₹50 lakh" : `₹${budgetLakh} lakh`;

  const systemPrompt = `You are an Indian car market advisor. Respond ONLY in valid JSON matching this exact shape:
{
  "intro": "A short introductory sentence",
  "cars": [
    {
      "rank": 1,
      "name": "Car Name Variant",
      "price": "₹X.XX - ₹Y.YY Lakh",
      "why": "2-3 sentences explaining why this fits.",
      "specs": ["spec1", "spec2", "spec3"]
    }
  ]
}
No markdown, no preamble, output only valid JSON.`;

  const userPrompt = `I am looking for a car. My budget is ${budgetText}. 
My primary use case is ${useCase}. 
My top priority is ${priority}. 
My preferred body type is ${bodyType}. 
Please recommend 3 cars in the Indian market.`;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 1000,
          response_format: { type: "json_object" },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    const parsed = JSON.parse(text);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return res.status(500).json({ error: "Failed to fetch recommendations" });
  }
}
