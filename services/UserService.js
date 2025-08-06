const { User } = require('../models');
const bcrypt = require('bcryptjs');

const createUser = async (user) => {

    const userExists = await User.findOne({ where: { email: user.email } });
    if (userExists) {
        const error = new Error("Email already registered");
        error.status = 400;
        throw error;
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10);

    const newUser = await User.create({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
        role: user.role
    });

    return newUser;
}

const deleteUser = async (email) => {
    const user = await User.findOne({ where: { email } });

    try {
        if (!user) {
            const error = new Error("User is not registered.");
            error.status = 400;
            throw error;
        }

        await user.destroy();

        return user;
    } catch (err) {
        err.status = 500;
        throw err;
    }

}

const getUserByEmail = async (email) => {

    // Will retrieve user excluding its password
    const user = await User.findOne({attributes: {exclude: ['password']}, where: { email },});

    try {
        if (!user) {
            const error = new Error("User is not registered.");
            error.status = 400;
            throw error;
        }

        return user;
    } catch (err) {
        err.status = 500;
        throw err;
    }
}

const updateUser = async (id, updates) => {
    const allowedFields = ['name','lastname','email'];
    const fieldsToUpdate = {};

    for (const key of allowedFields) {
        if(updates[key] != undefined) {
            fieldsToUpdate[key] = updates[key];
        }
    }

    const user = await User.findByPk(id);
    if (!user) throw new Error("User is not defined");

    await user.update(fieldsToUpdate);

    return user;
}

const changePassword = async ({ email, oldPassword, newPassword}) => {

    let error = new Error();

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        const error = new Error("User is not registered.");
            error.status = 400;
            throw error;
    }

    // TODO: Hacer validaciones de password nuevo, 12 digitos, etc
    
    const oldPasswordIsValid = bcrypt.compareSync(oldPassword, user.password);

    const hashNewPass = bcrypt.hashSync(newPassword, 10);
    

    if (!oldPasswordIsValid) {
        const error = new Error("Actual password is invalid.");
            error.status = 401;
            throw error;
    } 
        
    await user.update({ password : hashNewPass});
    return user;
}

module.exports = {
    createUser,
    deleteUser,
    getUserByEmail,
    updateUser,
    changePassword
};
