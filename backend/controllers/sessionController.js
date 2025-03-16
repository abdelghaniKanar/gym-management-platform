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

// Book a training session
// Route:  POST /api/sessions/:id/book
// Access Member only
const bookSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Ensure session isn't full
    if (session.bookedMembers.length >= session.maxCapacity) {
      return res.status(400).json({ message: "Session is full" });
    }

    // Ensure member isn't already booked
    if (session.bookedMembers.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You have already booked this session" });
    }

    // Add member to bookedMembers list
    session.bookedMembers.push(req.user.id);
    await session.save();

    res.status(200).json({ message: "Booking successful", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sessions booked by the logged-in member
// Route:  GET /api/sessions/booked
// Access Member only
const getBookedSessions = async (req, res) => {
  try {
    const bookedSessions = await Session.find({
      bookedMembers: req.user.id,
    }).populate("trainer", "name");

    res.status(200).json(bookedSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel a session booking
// Route:  DELETE /api/sessions/:id/cancel
// Access Member only
const cancelBooking = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Remove member from bookedMembers list
    session.bookedMembers = session.bookedMembers.filter(
      (memberId) => memberId.toString() !== req.user.id
    );

    await session.save();
    res
      .status(200)
      .json({ message: "Booking cancelled successfully", session });
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
  bookSession,
  getBookedSessions,
  cancelBooking,
};
