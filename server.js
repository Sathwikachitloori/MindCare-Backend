import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./Routes/authRoutes.js";
import journalRoutes from "./Routes/journalRoutes.js";

dotenv.config();

const app = express();

// Enable CORS for your frontend domain
app.use(cors({
  origin: "https://mind-care-43iy10auf-sathwikachitlooris-projects.vercel.app", 
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use environment PORT or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
