const mongoose = require('mongoose');

const trainCoachSchema = new mongoose.Schema({
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  name: {
    type: String, // e.g., 'A1', 'B1', 'C1'
    required: true
  }
}, { _id: false });

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  defaultCoaches: [trainCoachSchema],
  runningDays: {
    type: [Number], // 0 (Sunday) to 6 (Saturday)
    default: [0, 1, 2, 3, 4, 5, 6]
  },
  departureTime: {
    type: String, // e.g. "05:55 AM" or "05:55"
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Train', trainSchema);