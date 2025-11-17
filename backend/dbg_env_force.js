// dbg_env_force.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const envPath = path.resolve("F:/FinalYearProject/backend/.env");
console.log("Resolved envPath:", envPath);

try {
  const raw = fs.readFileSync(envPath, { encoding: "utf8" });
  console.log("=== RAW .env CONTENT START ===");
  console.log(raw);
  console.log("=== RAW .env CONTENT END ===");
} catch (err) {
  console.error("Could not read .env file at that path:", err.message);
}

const r = dotenv.config({ path: envPath });
console.log("dotenv result:", r);
console.log("JUDGE0_API_URL:", process.env.JUDGE0_API_URL);
console.log("JUDGE0_API_HOST:", process.env.JUDGE0_API_HOST);
console.log("JUDGE0_API_KEY present:", !!process.env.JUDGE0_API_KEY);
