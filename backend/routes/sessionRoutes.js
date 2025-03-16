const express = require("express");
const { check } = require("express-validator");
const {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  bookSession,
  getBookedSessions,
  cancelBooking,
} = require("../controllers/sessionController");
const { authMiddleware, isTrainer } = require("../middleware/authMiddleware");

const router = express.Router();

// Validation rules for creating/updating a session
const validateSession = [
  check("startDate", "Start date is required").not().isEmpty().isISO8601(),
  check("endDate", "End date is required").not().isEmpty().isISO8601(),
  check("maxCapacity", "Max capacity must be a number").isInt({ min: 1 }),
];

// Public Routes
router.get("/", getAllSessions);
router.get("/:id", getSessionById);

// Protected Routes (Trainer Only)
router.post("/", authMiddleware, isTrainer, validateSession, createSession);
router.put("/:id", authMiddleware, isTrainer, validateSession, updateSession);
router.delete("/:id", authMiddleware, isTrainer, deleteSession);

// Protected Routes (Member Only)
router.post("/:id/book", authMiddleware, bookSession);
router.get("/booked", authMiddleware, getBookedSessions);
router.delete("/:id/cancel", authMiddleware, cancelBooking);

module.exports = router;
