const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModules");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// One-time registration route (delete after use)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hashed });
  await admin.save();
  res.json({ message: "Admin registered successfully" });
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

// Protected admin route
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});
router.get("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

module.exports = router;
