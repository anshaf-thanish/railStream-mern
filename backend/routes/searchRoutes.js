const express = require('express');
const router = express.Router();
const { searchTrains, getSeatAvailability } = require('../controllers/searchController');

router.get('/', searchTrains);
router.get('/seats', getSeatAvailability);

module.exports = router;
