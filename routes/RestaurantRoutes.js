const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/RestaurantController.js');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizedRole.js');

router.get('/getAllByUserId', authenticateToken, restaurantController.getAllByUserId);
router.put('/update/:id', authenticateToken, restaurantController.updateByUserId);
router.delete('/delete/:id', authenticateToken,authorizeRole(["ADMIN"]), restaurantController.deleteRestaurantById);
router.post('/create', authenticateToken,authorizeRole(["ADMIN"]), restaurantController.createRestaurant);

module.exports = router;