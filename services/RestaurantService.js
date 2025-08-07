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

const updateRestaurant = async (id,updates) => {
    const allowedFields = ['name','description','address',
                            'phone','open_hour','close_hour',
                            'language_code'];
    const fieldsToUpdate = {};

    for (const key of allowedFields) {
        if(updates[key] != undefined) {
            fieldsToUpdate[key] = updates[key];
        }
    }

    const restaurant = await Restaurant.findByPk(id)
    if (!restaurant) throw new Error("Restaurant is not defined");

    await restaurant.update(fieldsToUpdate, {where: {id : id}});

    return restaurant;
}

module.exports = {
    getRestaurantsByUserId,
    updateRestaurant
};
