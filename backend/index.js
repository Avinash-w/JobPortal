// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/register", (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    phone,
    experienceLevel,
    city,
    workStatus,
  } = req.body;

  if (!name || !email || !password || !confirmPassword || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // TODO: Save to database (MongoDB, MySQL, etc.)
  console.log("User registered:", req.body);

  return res.status(200).json({ message: "Registration successful!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
