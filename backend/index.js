import express, { urlencoded } from "express";
  import connectDb from "./db.js";
  import cors from "cors";
  import Users from "./models/userModel.js";
  import jwt from "jsonwebtoken";
  import bcrypt from 'bcrypt';
  import productRoutes from "./Routes/productRoutes.js";
  import orderRoutes from "./Routes/orderRoutes.js"
  import authMiddleware from "./authMiddleware.js";
  
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
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: hashedPassword,
        isAdmin: true
      });
  
      await newUser.save();
      res.status(201).json({ message: "Admin registered successfully", user: newUser });
    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  });
  
  // Admin login
  app.post("/admin/login", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
  
    let user;
    try {
      user = await Users.find({ email });
    } catch (error) {
      return res.status(401).json({ message: "Authentication failed." });
    }
    console.log(user);
    const pwIsValid = bcrypt.compare(password, user[0].password);
    if (!pwIsValid) {
      return res.status(422).json({
        message: "Invalid credentials.",
        errors: { credentials: "Invalid email or password entered." },
      });
    }
    let isAdmin = user[0].isAdmin;
  
    const token = jwt.sign({ email, isAdmin }, KEY, { expiresIn: "1h" });
    console.log(isAdmin);
    console.log("token", token);
    res.json({ token, isAdmin });
  });
  
  // User registration
  app.post("/user/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(422).json({ error: "User with email already exists" });
      }
  
      const newUser = new Users({ name, email, password });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error registering user:", error);
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
  
  app.get("/users", async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  });
  
  app.put("/users/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Internal server error." });
    }
  });
  
  app.delete("/users/:id", authMiddleware, async (req, res) => {
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
  