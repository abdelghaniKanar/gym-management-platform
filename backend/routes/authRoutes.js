const express = require("express");
const {
  validate,
  validateSignup,
  validateLogin,
} = require("../middleware/validateMiddleware");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Signup Route
router.post("/signup", validate(validateSignup), signup);

// Login Route
router.post("/login", validate(validateLogin), login);

module.exports = router;
