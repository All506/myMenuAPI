const restaurantService = require('../services/RestaurantService');

exports.getAllByUserId = async (req, res) => {
    // Will extract user's id from token
    const userId = req.user.id;

    try {
        const restaurants = await restaurantService.getRestaurantsByUserId(userId);
        res.status(200).json({restaurants});
    } catch (err) { 
        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
}

exports.updateByUserId = async (req, res) => {
    const userId = req.user.id; // funcionando
    const restaurantId = req.params.id;
    const updates = req.body;

    // TODO: Verificar que el restaurante pertenece al usuario que envia la solicitud
    try {
        const updatedRestaurant = await restaurantService.updateRestaurant(restaurantId,updates);
        res.json(updatedRestaurant);
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
}