const { validationResult, check } = require("express-validator");

// Middleware to handle validation errors
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next(); // Continue if no validation errors
  };
};

// Validation rules for user signup
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

// Validation rules for user login
const validateLogin = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

// Validation rules for creating/updating a session
const validateSession = [
  check("startDate", "Start date is required").not().isEmpty().isISO8601(),
  check("endDate", "End date is required").not().isEmpty().isISO8601(),
  check("maxCapacity", "Max capacity must be a number").isInt({ min: 1 }),
];

module.exports = { validate, validateSignup, validateLogin, validateSession };
