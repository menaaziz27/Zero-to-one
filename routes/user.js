// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const { getProfile, getEditProfile } = require('../controllers/userController');
const profileController = require('../controllers/profileController');


const router = express.Router();

router.get('/me', getProfile);

router.get('/editProfile', getEditProfile)

router.get('/updateProfile', profileController.getUpdateProfile);

router.post('/profile', profileController.postUpdateProfile);


router.get('/profile/:id', profileController.getUsersProfile);

// get a userprofile
// router.get('/:username')


module.exports = router;
