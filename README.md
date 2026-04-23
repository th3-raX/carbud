# Car Buyer Advisor

A production-ready monorepo boilerplate for a car buying advisor web app, built with React 18, Vite, TypeScript, and a Vercel Serverless API using Groq's LLaMA 3.1 8B instant model.

## Tech Stack
- Frontend: React 18, Vite, TypeScript
- Backend: Vercel Serverless API Routes (`/api`)
- AI Model: Groq (`llama-3.1-8b-instant`)
- Styling: Vanilla CSS

## Setup Instructions

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Variables:**
   Create a `.env.local` file at the root of the project with your Groq API key:
   \`\`\`env
   GROQ_API_KEY=gsk_your_api_key_here
   \`\`\`

3. **Run Locally:**
   Use Vercel Dev to run both the frontend and the serverless functions locally:
   \`\`\`bash
   npx vercel dev
   \`\`\`
   The app will run on `http://localhost:3000`. The Vite server is used under the hood, and API requests will be properly routed to the `api/` directory.

4. **Build for Production:**
   \`\`\`bash
   npm run build
   \`\`\`

## Deployment
1. Push the code to a GitHub repository.
2. Import the repository into your Vercel account.
3. In the Vercel project settings, add the `GROQ_API_KEY` environment variable.
4. Deploy!

## Project Structure
- `api/recommend.ts`: Vercel serverless function handling the Groq API call.
- `src/components/`: Reusable, hand-rolled UI components.
- `src/steps/`: Wizard steps corresponding to the user flow.
- `src/hooks/useWizard.ts`: State management hook orchestrating the wizard.
- `src/styles/`: Global CSS and variables for premium aesthetics.
