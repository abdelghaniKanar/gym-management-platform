const express = require("express");
const {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");
const { authMiddleware, isTrainer } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getAllSessions);
router.get("/:id", getSessionById);

// Protected Routes (Trainer Only)
router.post("/", authMiddleware, isTrainer, createSession);
router.put("/:id", authMiddleware, isTrainer, updateSession);
router.delete("/:id", authMiddleware, isTrainer, deleteSession);

module.exports = router;
