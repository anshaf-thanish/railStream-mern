const Station = require('../models/Station');
// @desc    Get all stations
// @route   GET /api/stations
// @access  Public
exports.getStations = async (req, res) => {
  try {
    const stations = await Station.find({ status: 'active' }).sort({ name: 1 });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Create a station
// @route   POST /api/stations
// @access  Private/Admin
exports.createStation = async (req, res) => {
  try {
    const { name, code, city } = req.body;
    const stationExists = await Station.findOne({ $or: [{ name }, { code }] });
    if (stationExists) {
      return res.status(400).json({ message: 'Station name or code already exists' });
    }
    const station = await Station.create({ name, code, city });
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
