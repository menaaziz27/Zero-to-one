// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const {
    getHome,
    getRoadmaps,
    getNews,
    getTimeline
} = require('../controllers/homeController');

const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = express.Router();

//! adjust home route for auth and other for unAuth
router.get('/', getHome);

router.get('/timeline', isAuthenticated, getTimeline);

router.get('/roadmaps', getRoadmaps)

router.get('/news', getNews)

module.exports = router;
