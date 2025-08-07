const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizedRole.js');
const securityService = require('../services/SecurityService.js');

router.post('/create', authenticateToken,authorizeRole(["ADMIN"]), userController.createUser);
router.get('/getByEmail', authenticateToken,authorizeRole(["ADMIN"]), userController.getUserByEmail);
router.delete('/delete', authenticateToken,authorizeRole(["ADMIN"]), userController.deleteUser);
router.put('/update/:id', authenticateToken,authorizeRole(["ADMIN"]), userController.updateUser);
router.put('/changePassword', securityService.authenticateToken, userController.changePassword);

module.exports = router;