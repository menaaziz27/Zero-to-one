// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/profile', userController.getProfile);

router.get('/editProfile', userController.getEditProfile)


module.exports = router;
