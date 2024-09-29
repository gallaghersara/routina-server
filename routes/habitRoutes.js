const express = require("express");
const habitController = require("../controllers/habitController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, habitController.getHabits);
router.post("/", authMiddleware, habitController.addHabit);
router.put("/:id", authMiddleware, habitController.updateHabit);
router.delete("/:id", authMiddleware, habitController.deleteHabit);

module.exports = router;
