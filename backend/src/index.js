import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"
 

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoute from "./routes/executeCode.route.js";
import submissionRoutes from "./routes/submission.route.js";
import playlistRoutes from "./routes/playlist.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin:"http://localhost:5173",
    origin:"https://final-year-project-five-gamma.vercel.app",
    credentials:true,
}))

app.use(express.json());
app.use(cookieParser())


// // server.js (or src/server.js) — put this *near the top*, right after express() and body parsing
// // DEV ONLY: global bypass for local testing — remove before commit / prod
// app.use((req, res, next) => {
//   if (req.headers["x-bypass-auth"] === "true") {
//     req.user = { id: "dev-user", role: "ADMIN" };
//   }
//   return next();
// });

app.get("/", (req,res)=>{
    res.send("Hello Guys Welcome to leetlab 🔥");
})

// health route for quick checks
app.get("/health", (req, res) => {
  return res.status(200).send("OK");
});


app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problems",problemRoutes)
app.use("/api/v1/execute-code",executionRoute)
app.use("/api/v1/submission",submissionRoutes)

app.use("/api/v1/playlist",playlistRoutes)


app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 8080");
})

// app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
//   console.log("Server running on", process.env.PORT || 8080);
// });


console.log("RAPIDAPI_KEY:", !!process.env.JUDGE0_API_KEY);
console.log("JUDGE0_API_URL:", process.env.JUDGE0_API_URL);
console.log("JUDGE0_RAPIDAPI_HOST:", process.env.JUDGE0_API_HOST);

