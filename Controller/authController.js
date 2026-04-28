import bcrypt from "bcryptjs";
import generateToken from "../Utils/generateToken.js";
import db from "../config/dbMysql.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔍 Check if user already exists in MySQL
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.log("DB ERROR:", err);
          return res.status(500).json({ message: "Database error" });
        }

        if (result.length > 0) {
          return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Insert user into MySQL
        db.query(
          "INSERT INTO users (email) VALUES (?)",
          [email],
          (err2, result2) => {
            if (err2) {
              console.log("DB ERROR:", err2);
              return res.status(500).json({ message: "Database error" });
            }

            res.status(201).json({
              message: "User registered successfully",
            });
          }
        );
      }
    );

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Logging in:", email);

    // ✅ Save login to MySQL
    db.query(
      "INSERT INTO users (email) VALUES (?)",
      [email],
      (err, result) => {
        if (err) {
          console.log("MySQL Error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        console.log("Login saved in MySQL:", email);

        res.json({
          message: "Login successful",
          token: generateToken(email),
        });
      }
    );

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};