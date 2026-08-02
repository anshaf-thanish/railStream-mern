const mongoose = require('mongoose');

const trainJourneySchema = new mongoose.Schema({
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  departureDate: {
    type: Date,
    required: true
  },
  route: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'delayed', 'departed', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, { timestamps: true });

// Ensure unique journey per train per day
trainJourneySchema.index({ train: 1, departureDate: 1 }, { unique: true });

module.exports = mongoose.model('TrainJourney', trainJourneySchema);
