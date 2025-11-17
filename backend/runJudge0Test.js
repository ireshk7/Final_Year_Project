// runJudge0Test.js
import dotenv from "dotenv";
dotenv.config(); // loads .env from current working directory

import { submitBatch, pollBatchResults } from "./src/libs/judge0.lib.js";

console.log("Using environment values:");
console.log("JUDGE0_API_URL:", process.env.JUDGE0_API_URL);
console.log("JUDGE0_API_HOST:", process.env.JUDGE0_API_HOST);
console.log("JUDGE0_API_KEY present:", !!process.env.JUDGE0_API_KEY);
console.log("--------------------------------------");

(async () => {
  try {
    // a simple Python test
    const submissions = [
      {
        source_code: 'print("hello")',
        language_id: 71, // Python
        stdin: "",
        expected_output: "hello\n",
      },
    ];

    console.log("Submitting batch to Judge0...");
    const submitResp = await submitBatch(submissions);
    console.log("Raw submit response:", submitResp);

    // Extract tokens
    const tokenObjs = Array.isArray(submitResp)
      ? submitResp
      : submitResp?.submissions || submitResp;

    const tokens = tokenObjs
      .map((t) => (typeof t === "string" ? t : t?.token))
      .filter(Boolean);

    console.log("Extracted tokens:", tokens);

    console.log("Polling Judge0 for results...");
    const results = await pollBatchResults(tokens);

    console.log("Final results:");
    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error(
      "Judge0 test error:",
      err?.response?.data || err?.message || err
    );
  }
})();
