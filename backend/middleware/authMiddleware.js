const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  let token;

  // Check if token is provided in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Continue to the next middleware/controller
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

// Middleware to check if user is a trainer
const isTrainer = (req, res, next) => {
  if (req.user && req.user.role === "trainer") {
    next(); // Continue to next middleware/controller
  } else {
    res
      .status(403)
      .json({ message: "Forbidden: Only trainers can perform this action" });
  }
};

module.exports = { authMiddleware, isTrainer };
