import "dotenv/config";
import { createApp } from "./app.js";
import { connectDatabase } from "./lib/database.js";

const port = Number(process.env.PORT ?? 5000);

await connectDatabase();

const app = createApp();

app.listen(port, () => {
  console.log(`AI Travel Planner API running on http://localhost:${port}`);
});
