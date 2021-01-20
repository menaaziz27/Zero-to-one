// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const profileController = require('../controllers/profileController');

const router = express.Router();

router.get('/profile', profileController.getProfile);

router.get('/updateProfile', profileController.getUpdateProfile);

router.post('/profile', profileController.postUpdateProfile);


module.exports = router;
