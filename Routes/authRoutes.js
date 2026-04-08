import express from "express";
import { registerUser, loginUser } from "../Controller/authController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.user,
  });
});

export default router;