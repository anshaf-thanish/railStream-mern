const Train = require('../models/Train');
// @desc    Get all trains
// @route   GET /api/trains
// @access  Public
exports.getTrains = async (req, res) => {
  try {
    const trains = await Train.find({ status: 'active' })
      .populate({
        path: 'route',
        populate: { path: 'stations.station' }
      })
      .populate('defaultCoaches.coach');
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Create a train
// @route   POST /api/trains
// @access  Private/Admin
exports.createTrain = async (req, res) => {
  try {
    const { trainNumber, name, route, defaultCoaches, runningDays, departureTime } = req.body;
    
    const trainExists = await Train.findOne({ trainNumber });
    if (trainExists) {
      return res.status(400).json({ message: 'Train number already exists' });
    }
    const train = await Train.create({
      trainNumber, name, route, defaultCoaches, runningDays, departureTime
    });
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
