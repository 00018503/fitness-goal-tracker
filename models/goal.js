const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  type: { type: String, required: true },
  target: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  status: { type: String, default: "in progress" },
});

module.exports = mongoose.model("Goal", goalSchema);
