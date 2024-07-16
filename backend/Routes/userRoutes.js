// Assuming you have a new route file for user-related endpoints (userRoutes.js or similar)

import express from 'express';
import Users from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
const KEY = "jwtsecretkey"; // Ensure the key matches the one used for token generation

router.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const pwIsValid = await bcrypt.compare(password, user.password);
    if (!pwIsValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Assuming isAdmin is not relevant for user login
    const token = jwt.sign({ email }, KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
