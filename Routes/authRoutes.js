import express from "express";

const router = express.Router();

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // TODO: Replace with real authentication logic
  if (email && password) {
    return res.json({
      token: "dummy-jwt-token",
      message: "Login successful"
    });
  } else {
    return res.status(400).json({ message: "Missing email or password" });
  }
});

// Register route
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // TODO: Replace with real registration logic
  if (name && email && password) {
    return res.json({
      token: "dummy-jwt-token",
      message: "Registration successful"
    });
  } else {
    return res.status(400).json({ message: "Missing fields" });
  }
});

// Export router as default
export default router;
