# carbud

> A guided car buying advisor that takes buyers from "I don't know what to buy" to a confident shortlist — in under 2 minutes.

**Live demo:** [https://carbud-three.vercel.app/](https://https://carbud-three.vercel.app/)

---

## Local setup

```bash
# Clone the repo
git clone https://github.com/your-username/carbud.git
cd carbud

# Install dependencies
npm install

# Add your Groq API key
echo "GROQ_API_KEY=your-key-here" > .env.local

# Run locally
npm run dev
```

Get a free Groq API key at [console.groq.com](https://console.groq.com).

## Deploying to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add `GROQ_API_KEY` under **Environment Variables**
4. Deploy — every subsequent `git push main` redeploys automatically

---

## Project structure

```
/
├── api/
│   └── recommend.ts        # Serverless function — Groq API call, key stays here
├── src/
│   ├── components/         # ProgressBar, OptionCard, BudgetSlider, ResultCard, LoadingState
│   ├── steps/              # StepBudget, StepUseCase, StepPriority, StepBodyType
│   ├── hooks/
│   │   └── useWizard.ts    # All wizard state — step, answers, loading, results
│   ├── types/index.ts      # BuyerProfile, RecommendRequest, RecommendResponse
│   ├── styles/             # global.css, variables.css
│   └── App.tsx
├── .env.local              # GROQ_API_KEY (never committed)
└── vercel.json
```
