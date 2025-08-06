const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/RestaurantController.js');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizedRole.js');

router.get('/getAllById', authenticateToken, restaurantController.getAllByUserId);

module.exports = router;