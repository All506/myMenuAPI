const { Restaurant } = require('../models');
const { User } = require('../models');

const createRestaurant = async (restaurant) => {

    const userExists = await User.findOne({ where: { id: restaurant.user_id } });

    if (!userExists) {
        const error = new Error("User id is not registered");
        error.status = 400;
        throw error;
    }

    const newRestaurant = await Restaurant.create({
        user_id: restaurant.user_id,
        name: restaurant.name,
        restaurant_id: restaurant.restaurant_id,
        description: restaurant.description,
        address: restaurant.address,
        phone: restaurant.phone,
        open_hour: restaurant.open_hour,
        close_hour: restaurant.close_hour,
        language_code: restaurant.language_code
    });

    return newRestaurant;
}

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

const deleteRestaurantById = async (id) => {
    const restaurant = await Restaurant.findOne({ where: { id } });

    try {
        if (!restaurant) {
            const error = new Error("Restaurant is not registered.");
            error.status = 400;
            throw error;
        }

        await restaurant.destroy();

        return restaurant;
    } catch (err) {
        err.status = 500;
        throw err;
    }
}

module.exports = {
    getRestaurantsByUserId,
    updateRestaurant,
    deleteRestaurantById,
    createRestaurant
};
