import express, { urlencoded } from "express";
import connectDb from "./db.js";
import cors from "cors";
import Users from "./models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import authMiddleware, { verifyAdmin } from "./authMiddleware.js";

const PORT = 7000;
const app = express();
const KEY = "jwtsecretkey"; // Ensure the key is consistent with the one used in token generation

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

connectDb();

// Admin registration
app.post("/admin/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User with email already exists" });
    }

    const newUser = new Users({
      name,
      email,
      password,
      isAdmin: true,
    });

    await newUser.save();

    console.log(`Admin registered with email: ${email}, password: ${password}`);
    
    res.status(201).json({ message: "Admin registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Admin login
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Authentication failed.",
        errors: { credentials: "Invalid email or password entered." },
      });
    }

    console.log(`User found: ${user.email}, hashed password: ${user.password}`);

    const pwIsValid = await bcrypt.compare(password, user.password);

    if (!pwIsValid) {
      return res.status(422).json({
        message: "Invalid credentials.",
        errors: { credentials: "Invalid email or password entered." },
      });
    }

    const isAdmin = user.isAdmin;

    if (!isAdmin) {
      return res.status(403).json({
        message: "Access denied.",
        errors: { authorization: "You do not have admin privileges." },
      });
    }

    const token = jwt.sign({ email, isAdmin }, KEY, { expiresIn: "1h" });
    console.log("token:", token);
    res.json({ token, isAdmin });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


// User login
app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed." });
    }

    const pwIsValid = await bcrypt.compare(password, user.password);
    if (!pwIsValid) {
      return res.status(422).json({
        message: "Invalid credentials.",
        errors: { credentials: "Invalid email or password entered." },
      });
    }

    const isAdmin = user.isAdmin;
    const token = jwt.sign({ email, isAdmin }, KEY, { expiresIn: "1h" });
    res.json({ token, isAdmin });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.get("/users", authMiddleware, verifyAdmin, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

app.put("/users/:id", authMiddleware, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

app.delete("/users/:id", authMiddleware, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await Users.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
