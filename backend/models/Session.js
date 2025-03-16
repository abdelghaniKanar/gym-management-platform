const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model (Trainer)
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    bookedMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference the User model (Members)
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
