const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Enable JSON parsing

// Routes

// Auth
app.use("/api/auth", require("./routes/authRoutes"));

// Sessions manipulation
app.use("/api/sessions", require("./routes/sessionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
