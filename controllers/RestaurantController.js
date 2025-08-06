const restaurantService = require('../services/RestaurantService');

exports.getAllByUserId = async (req, res) => {
    // Will extract user's id from token
    const userId = req.user.id;

    try {
        const restaurants = await restaurantService.getRestaurantsByUserId(userId);
        res.status(200).json({restaurants});
    } catch (err) {
        console.error(err);

        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
}
