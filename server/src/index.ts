import "dotenv/config";
import { createApp } from "./app.js";
import { connectDatabase } from "./lib/database.js";

const port = Number(process.env.PORT ?? 5000);

await connectDatabase();

const app = createApp();

// Validate required environment variables
if (!process.env.OPENAI_API_KEY) {
  console.error(
    "❌ FATAL ERROR: OPENAI_API_KEY is not defined in environment variables",
  );
  console.error("Please create a .env file with your OpenAI API key");
  process.exit(1);
}

console.log("✅ OpenAI API key is configured");
console.log(`📦 Using model: ${process.env.OPENAI_MODEL || "gpt-4o-mini"}`);

app.listen(port, () => {
  console.log(`AI Travel Planner API running on http://localhost:${port}`);
});
