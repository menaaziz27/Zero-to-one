// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 

const {
  getUpdateProfile,
  postUpdateProfile,
  getUsersProfile
} = require('../controllers/profileController');

const { isAuthenticated } = require('../middleware/isAuthenticated');


const router = express.Router();

router.get('/updateProfile', isAuthenticated, getUpdateProfile);

router.post('/profile', isAuthenticated, postUpdateProfile);


router.get('/profile/:id', isAuthenticated, getUsersProfile);


module.exports = router;
