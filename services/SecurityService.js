const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'tu_clave_secreta';

const login = async (email, password) => {

    const user = await User.findOne({
        where: { email },
        include: [{
            model: Role,
            as: 'role'
        }]
    },);

    if (!user) throw new Error('User is not registered');

    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) throw new Error('Invalid password');

    const token = jwt.sign({
        email: user.email,
        rol: user.role.name
    }, SECRET_KEY, { expiresIn: '1h' });

    return token;

}

const tokenVerification = (token) => {
   
    // Deletes Bearer from token
    const authHeader = token && token.split(' ')[1];

    if (!authHeader) {
        throw new Error('Invalid header');
    }

    try {
        const decoded = jwt.verify(authHeader, SECRET_KEY);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

// Allows usage in external packages
module.exports = {
  login,
  tokenVerification
};