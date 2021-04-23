// ============ Node-Packages ============
const router = require('express').Router();

// ============ My-Modules ============
const {
    getUpdateProfile,
    postUpdateProfile,
    getUserProfile,
    validateProfile,
    postFollow,
    getFollowers,
    getFollowing,
    getFollowersData,
    getFollowingData,
} = require('../controllers/profileController');

const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/:username/followers', getFollowers);
router.get('/:userId/followersdata', getFollowersData);
router.get('/:username/following', getFollowing);
router.get('/:userId/followingdata', getFollowingData);
router.get('/profile/:username', isAuthenticated, getUserProfile);
router.put('/:userId/follow', postFollow);
router.get('/updateProfile', isAuthenticated, getUpdateProfile);
router.post('/profile', isAuthenticated, validateProfile, postUpdateProfile);

module.exports = router;