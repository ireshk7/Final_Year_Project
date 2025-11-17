// testJudge0Run.js
import dotenv from "dotenv";
dotenv.config();

import { submitBatch, pollBatchResults } from "./libs/judge0.lib.js";

(async () => {
  try {
    const submissions = [
      { source_code: 'print("hello")', language_id: 71, stdin: "", expected_output: "hello\n" }
    ];
    const submitResp = await submitBatch(submissions);
    console.log("SubmitResp:", submitResp);
    const tokenObjs = Array.isArray(submitResp) ? submitResp : submitResp?.submissions || submitResp;
    const tokens = tokenObjs.map(t => typeof t === "string" ? t : t.token).filter(Boolean);
    console.log("Tokens:", tokens);
    const results = await pollBatchResults(tokens);
    console.log("Results:", results);
  } catch (e) {
    console.error("Judge0 test error:", e.response?.data || e.message || e);
  }
})();
