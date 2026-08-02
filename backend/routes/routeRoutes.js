const express = require('express');
const router = express.Router();
const { getRoutes, createRoute } = require('../controllers/routeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getRoutes)
  .post(protect, admin, createRoute);
  
module.exports = router;
