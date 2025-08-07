const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/RestaurantController.js');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/getAllById', authenticateToken, restaurantController.getAllByUserId);
router.put('/update/:id', authenticateToken, restaurantController.updateByUserId);

module.exports = router;