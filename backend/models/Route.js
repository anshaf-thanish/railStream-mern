const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  trainName: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  stops: [
    {
      station: String,
      arrival: String,
      departure: String
    }
  ]
});

module.exports = mongoose.model("Route", routeSchema);