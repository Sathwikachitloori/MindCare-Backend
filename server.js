import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import journalRoutes from "./Routes/journalRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// ✅ CORS (this alone is enough)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});