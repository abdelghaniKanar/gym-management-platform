const express = require("express");
const { check } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Validation rules
const validateSignup = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  check("role", "Role must be either 'member' or 'trainer'").isIn([
    "member",
    "trainer",
  ]),
];

const validateLogin = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

// Signup Route
router.post("/signup", validateSignup, signup);

// Login Route
router.post("/login", validateLogin, login);

module.exports = router;
