// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/me', userController.getProfile);

router.get('/editProfile', userController.getEditProfile)

// get a userprofile
// router.get('/:username')


module.exports = router;
