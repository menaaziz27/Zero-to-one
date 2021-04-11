// ============ Node-Packages ============
const router = require('express').Router();

// ============ My-Modules ============
const {
	getUpdateProfile,
	postUpdateProfile,
	getUserProfile,
	validateProfile,
} = require('../controllers/profileController');

const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/profile/:username', isAuthenticated, getUserProfile);
router.get('/updateProfile', isAuthenticated, getUpdateProfile);
router.post('/profile', isAuthenticated, validateProfile, postUpdateProfile);

module.exports = router;
