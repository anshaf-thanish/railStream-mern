const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  coachNumber: {
    type: String,
    required: true,
  },
  coachType: {
    type: String,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Coach", coachSchema);