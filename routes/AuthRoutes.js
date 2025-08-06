const express = require('express');
const router = express.Router();
const authController = require('../controllers/SecurityController.js');

router.post('/login', authController.login);
router.get('/tokenValidation', authController.tokenVerification);

module.exports = router;