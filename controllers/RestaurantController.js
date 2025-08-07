const restaurantService = require('../services/RestaurantService');

exports.createRestaurant = async (req, res) => {
    const restaurant = req.body;
    
    try {
        const createdRestaurant = await restaurantService.createRestaurant(restaurant);
        res.status(200).json({ restaurant : createdRestaurant })
    } catch(err) {
        console.error(err);

        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
    
}


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
    const userId = req.user.id;
    const restaurantId = req.params.id;
    const updates = req.body;

    try {
        const userRestaurants = await restaurantService.getRestaurantsByUserId(userId);
        const ownRestaurant = userRestaurants.some(restaurant => restaurant.id == restaurantId);

        if (!ownRestaurant) {
            res.status(404).json({ error: "Unauthorized access" });
        }

        const updatedRestaurant = await restaurantService.updateRestaurant(restaurantId,updates);
        res.json(updatedRestaurant);
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
}

exports.deleteRestaurantById = async (req, res) => {
    const restaurantId = req.params.id;

    try {
        await restaurantService.deleteRestaurantById(restaurantId);
        res.status(200).json({ message: "Restaurant has been deleted"});
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
}