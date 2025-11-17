import { submitBatch, pollBatchResults } from "./libs/judge0.lib.js";
import dotenv from "dotenv";
dotenv.config();

console.log("JUDGE0_API_URL:", process.env.JUDGE0_API_URL);
console.log("JUDGE0_API_HOST:", process.env.JUDGE0_API_HOST);
console.log("JUDGE0_API_KEY present:", !!process.env.JUDGE0_API_KEY);

(async () => {
  try {
    const submissions = [
      {
        source_code: 'print("hello")',
        language_id: 71,
        stdin: "",
        expected_output: "hello\n",
      },
    ];

    const submitResp = await submitBatch(submissions);
    console.log("submitResp:", submitResp);

    const tokens = submitResp.map((t) => t.token);
    const results = await pollBatchResults(tokens);
    console.log("results:", results);
  } catch (err) {
    console.error("Judge0 test error:", err.response?.data || err.message || err);
  }
})();
