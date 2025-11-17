// testAbout.js
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const url = `${process.env.JUDGE0_API_URL}/about`;

const rapidapiHeaders = {
  "x-rapidapi-host": (process.env.JUDGE0_API_HOST || "").trim(),
  "x-rapidapi-key": (process.env.JUDGE0_API_KEY || "").trim(),
  "Content-Type": "application/json",
};

console.log("URL:", url);
console.log("Headers to send (key masked):", {
  "x-rapidapi-host": rapidapiHeaders["x-rapidapi-host"],
  "x-rapidapi-key": rapidapiHeaders["x-rapidapi-key"] ? "*****(masked)*****" : "(empty)",
});

(async () => {
  try {
    const resp = await axios.get(url, { headers: rapidapiHeaders });
    console.log("Status:", resp.status);
    console.log("Response data:", resp.data);
  } catch (err) {
    // Print as much useful info as possible
    if (err.response) {
      console.error("Response status:", err.response.status);
      console.error("Response headers:", err.response.headers);
      console.error("Response data:", err.response.data);
    } else {
      console.error("No response (network or other error):", err.message);
    }
    console.error("Request config.headers (what axios sent):", err.config && err.config.headers);
  }
})();
