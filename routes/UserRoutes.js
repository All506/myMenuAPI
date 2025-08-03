const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizedRole.js');

router.post('/create', authenticateToken,authorizeRole(["ADMIN"]), userController.createUser);

module.exports = router;