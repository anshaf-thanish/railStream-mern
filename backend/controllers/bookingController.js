const Booking = require('../models/Booking');
const TrainJourney = require('../models/TrainJourney');
const mongoose = require('mongoose');
const crypto = require('crypto');
// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const {
      trainJourneyId,
      coachId,
      seatNumber,
      startStationId,
      endStationId,
      startIndex,
      endIndex,
      price
    } = req.body;
    // Validate if seat is actually available (prevent double booking)
    const conflictingBooking = await Booking.findOne({
      trainJourney: trainJourneyId,
      coach: coachId,
      seatNumber,
      status: { $ne: 'cancelled' },
      $and: [
        { startIndex: { $lt: endIndex } },
        { endIndex: { $gt: startIndex } }
      ]
    }).session(session);
    if (conflictingBooking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Seat is no longer available for this segment' });
    }
    // Generate unique reference
    const referenceId = 'RS-' + crypto.randomBytes(3).toString('hex').toUpperCase();
    const booking = new Booking({
      user: req.user._id,
      trainJourney: trainJourneyId,
      coach: coachId,
      seatNumber,
      startStation: startStationId,
      endStation: endStationId,
      startIndex,
      endIndex,
      price,
      referenceId,
      status: 'confirmed'
    });
    await booking.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    res.status(201).json(booking);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'trainJourney',
        populate: { path: 'train route' }
      })
      .populate('startStation endStation coach')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
