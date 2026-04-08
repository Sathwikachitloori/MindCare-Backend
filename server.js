import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import journalRoutes from "./Routes/journalRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes); // ✅ added correctly here

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});