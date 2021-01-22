// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const { getProfile, getEditProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/me', getProfile);

router.get('/editProfile', getEditProfile)

// get a userprofile
// router.get('/:username')


module.exports = router;
