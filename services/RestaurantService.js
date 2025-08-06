const { Restaurant } = require('../models');

const getRestaurantsByUserId = async (id) => {
    const restaurants = await Restaurant.findAll({ where: { user_id: id } });

    if (restaurants.length == 0) {
        const error = new Error("No restaurants registered for user");
        error.status = 400;
        throw error;
    }

    return restaurants;
}

module.exports = {
    getRestaurantsByUserId
};
