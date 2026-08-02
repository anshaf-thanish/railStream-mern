const TrainJourney = require('../models/TrainJourney');
const Route = require('../models/Route');
const Booking = require('../models/Booking');
const Train = require('../models/Train');
const Coach = require('../models/Coach');
const Station = require('../models/Station');
// @desc    Search for trains between stations on a specific date
// @route   GET /api/search
// @access  Public
exports.searchTrains = async (req, res) => {
  try {
    const { startStationId, endStationId, date } = req.query;
    if (!startStationId || !endStationId || !date) {
      return res.status(400).json({ message: 'Please provide startStationId, endStationId, and date' });
    }
    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(queryDate);
    nextDate.setDate(nextDate.getDate() + 1);
    // Find routes containing both stations where start comes before end
    const routes = await Route.find({
      'stations.station': { $all: [startStationId, endStationId] }
    });
    const validRouteIds = [];
    const routeIndicesMap = {}; // routeId -> { startIndex, endIndex }
    routes.forEach(route => {
      const startIdx = route.stations.findIndex(s => s.station.toString() === startStationId);
      const endIdx = route.stations.findIndex(s => s.station.toString() === endStationId);
      if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
        validRouteIds.push(route._id);
        routeIndicesMap[route._id.toString()] = { startIndex: startIdx, endIndex: endIdx };
      }
    });
    if (validRouteIds.length === 0) {
      return res.json([]);
    }
    // Find train journeys on these routes for the specific date
    const journeys = await TrainJourney.find({
      route: { $in: validRouteIds },
      departureDate: { $gte: queryDate, $lt: nextDate }
    }).populate({
      path: 'train',
      populate: { path: 'defaultCoaches.coach' }
    }).populate('route');
    const results = journeys.map(journey => {
      const indices = routeIndicesMap[journey.route._id.toString()];
      const startStationDetail = journey.route.stations[indices.startIndex];
      const endStationDetail = journey.route.stations[indices.endIndex];
      
      // Calculate distance/price (stub: 10 units per distance)
      const distance = endStationDetail.distanceFromStart - startStationDetail.distanceFromStart;
      const basePrice = distance > 0 ? distance * 10 : 500;
      return {
        journeyId: journey._id,
        train: journey.train,
        route: journey.route,
        startStationIndex: indices.startIndex,
        endStationIndex: indices.endIndex,
        basePrice,
        departureTime: journey.train.departureTime // Simplification: actual time depends on station
      };
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get coach layout and seat availability for a segment
// @route   GET /api/search/seats
// @access  Public
exports.getSeatAvailability = async (req, res) => {
  try {
    const { journeyId, coachId, reqStartIndex, reqEndIndex } = req.query;
    if (!journeyId || !coachId || reqStartIndex === undefined || reqEndIndex === undefined) {
      return res.status(400).json({ message: 'Missing parameters' });
    }
    const startIndex = parseInt(reqStartIndex);
    const endIndex = parseInt(reqEndIndex);
    // Get coach layout
    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).json({ message: 'Coach not found' });
    // Find all bookings for this journey and coach that are NOT cancelled
    const existingBookings = await Booking.find({
      trainJourney: journeyId,
      coach: coachId,
      status: { $ne: 'cancelled' }
    });
    // Segment Algorithm implementation
    const seatsAvailability = coach.seats.map(seat => {
      // Find if this specific seat has a conflicting booking
      const conflict = existingBookings.some(b => {
        if (b.seatNumber !== seat.seatNumber) return false;
        
        // Conflict condition: reqStart < existingEnd AND reqEnd > existingStart
        return (startIndex < b.endIndex && endIndex > b.startIndex);
      });
      return {
        ...seat.toObject(),
        available: !conflict,
        status: conflict ? 'booked' : 'available'
      };
    });
    res.json({
      coach,
      seats: seatsAvailability
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};