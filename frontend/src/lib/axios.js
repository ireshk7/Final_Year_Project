// import axios from "axios"

// export const axiosInstance = axios.create({
//     baseURL:import.meta.env.MODE === "development" ? "http://localhost:8080/api/v1" : "/api/v1",
//     withCredentials:true,
// });


// src/lib/axios.js  (or wherever)
import axios from "axios";

const isDev = import.meta.env.DEV; // Vite shorthand for MODE === "development"

// Vite env vars must start with VITE_
const PROD_BACKEND = import.meta.env.VITE_API_URL; // set this in Vercel for production
const DEV_BACKEND  = import.meta.env.VITE_DEV_API_URL ?? "http://localhost:8080";

const base = isDev ? DEV_BACKEND : (PROD_BACKEND ?? "");

// If base is empty in production, this will request relative to the current host — avoid that.
const baseURL = base.endsWith("/api/v1") ? base : `${base.replace(/\/$/, "")}/api/v1`;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

