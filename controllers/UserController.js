const userService = require('../services/UserService');

exports.createUser = async (req, res) => {
    const user = req.body;
    try {
        const createUser = await userService.createUser(user);
        res.status(200).json({ user : createUser })
    } catch(err) {
        console.error(err);

        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
    
}