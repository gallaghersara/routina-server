const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   frequency: {
  //     type: String,
  //     enum: ["daily", "weekly", "custom"],
  //     required: true,
  //   },
  //   duration: { type: String, required: true },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //   status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

module.exports = mongoose.model("Habit", HabitSchema);
