const Habit = require("../models/Habit");

exports.getHabits = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const habits = await Habit.find({ userId });
    res.status(200).json(habits);
    console.log("getHabit");
    console.log(habits);
  } catch (err) {
    console.error("Error fetching habits:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.addHabit = async (req, res) => {
  try {
    const { name, description, frequency, duration } = req.body;
    console.log("User ID from token:", req.userId);

    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    console.log("Received habit data:", {
      name,
      description,
      frequency,
      duration,
      userId,
    });

    const habit = new Habit({
      name,
      description,
      frequency,
      duration,
      userId,
    });

    await habit.save();

    res.status(201).json(habit);
    console.log(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
