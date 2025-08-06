const userService = require('../services/UserService');
const securityService = require('../services/SecurityService');

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

exports.deleteUser = async (req, res) => {
    const email = req.body.email;
    try {
        const deletedUser = await userService.deleteUser(email);
        res.status(200).json({ message: "User has been deleted"});
    } catch (err) {
        console.error(err);

        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
}

exports.getUserByEmail = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await userService.getUserByEmail(email);
        res.status(200).json({user});
    } catch (err) {
        console.error(err);

        const status = err.status || 500;
        const message = err.message || 'Internal server error';

        res.status(status).json({ error: message });
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await userService.updateUser(userId,updates);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const email = req.user.email;
    
    try {
        const user = await userService.changePassword({email,oldPassword, newPassword});
        const token = await securityService.login(String(req.user.email),newPassword);
        // TODO: borrar la version antigua del token
        res.status(200).json({ message: 'Password updated succesfully', token });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}