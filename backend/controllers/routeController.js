const Route = require('../models/Route');
// @desc    Get all routes
// @route   GET /api/routes
// @access  Public
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find({ status: 'active' })
      .populate('railwayLine', 'name code')
      .populate('stations.station', 'name code city');
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Create a route
// @route   POST /api/routes
// @access  Private/Admin
exports.createRoute = async (req, res) => {
  try {
    const { name, railwayLine, stations } = req.body;
    const route = await Route.create({ name, railwayLine, stations });
    res.status(201).json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
