const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');

const createUser = async (user) => {

    const userExists = await User.findOne({where: {email:user.email}});
    if (userExists){
        const error = new Error("Email already registered");
        error.status = 400;
        throw error;
    }
    
    const hashedPassword = bcrypt.hashSync(user.password,10);

    const newUser = await User.create({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword
    });

    const newRole = await Role.create({
        name: user.role.name,
        user_id: newUser.id
    });

    newUser.dataValues.role = newRole;

    return newUser;
}

module.exports = {
    createUser
};