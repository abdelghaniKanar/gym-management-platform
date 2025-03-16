const Session = require("../models/Session");

// Create a new session
// Route:  POST /api/sessions
// Access Trainer only
const createSession = async (req, res) => {
  try {
    const { startDate, endDate, maxCapacity } = req.body;

    // Ensure only trainers can create sessions
    if (req.user.role !== "trainer") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Create new session
    const session = new Session({
      trainer: req.user.id,
      startDate,
      endDate,
      maxCapacity,
    });

    await session.save();
    res.status(201).json({ message: "Session created successfully", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sessions
// Route:  GET /api/sessions
// Access Public (Members & Trainers)
const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("trainer", "name");
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get session by ID
// Route:  GET /api/sessions/:id
// Access Public (Members & Trainers)
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate(
      "trainer",
      "name"
    );
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update session details
// Route  PUT /api/sessions/:id
// Access Trainer only
const updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Ensure only the trainer who created it can update it
    if (session.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { startDate, endDate, maxCapacity } = req.body;
    session.startDate = startDate || session.startDate;
    session.endDate = endDate || session.endDate;
    session.maxCapacity = maxCapacity || session.maxCapacity;

    await session.save();
    res.status(200).json({ message: "Session updated successfully", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete session
// Route  DELETE /api/sessions/:id
// Access Trainer only
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Ensure only the trainer who created it can delete it
    if (session.trainer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
};
