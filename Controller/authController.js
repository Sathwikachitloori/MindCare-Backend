import bcrypt from "bcryptjs";
import { readData, writeData } from "../Utils/fileHandler.js";
import generateToken from "../Utils/generateToken.js";

const filePath = "./data/users.json";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    let users = readData(filePath);

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    writeData(filePath, users);

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let users = readData(filePath);

    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user.id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};