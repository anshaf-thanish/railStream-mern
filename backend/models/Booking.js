const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainJourney: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainJourney',
    required: true
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  startStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  endStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  startIndex: {
    type: Number,
    required: true
  },
  endIndex: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  referenceId: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

// Index for segment lookup performance
bookingSchema.index({ trainJourney: 1, coach: 1, seatNumber: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);