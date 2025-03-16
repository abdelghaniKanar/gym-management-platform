const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Security Middleware
app.use(helmet()); // Security headers
app.use(xss()); // Prevent XSS attacks

// Rate limiter to prevent too many requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Routes
// Auth
app.use("/api/auth", require("./routes/authRoutes"));
// Sessions manipulation
app.use("/api/sessions", require("./routes/sessionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
