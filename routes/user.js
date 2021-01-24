// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const { getProfile, getEditProfile } = require('../controllers/userController');
const profileController = require('../controllers/profileController');

const { isAuthenticated } = require('../middleware/isAuthenticated');


const router = express.Router();

router.get('/me', getProfile);

router.get('/editProfile', isAuthenticated, getEditProfile)

router.get('/updateProfile', isAuthenticated, profileController.getUpdateProfile);

router.post('/profile', isAuthenticated, profileController.postUpdateProfile);


router.get('/profile/:id', isAuthenticated, profileController.getUsersProfile);

// get a userprofile
// router.get('/:username')


module.exports = router;
