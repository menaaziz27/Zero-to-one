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

router.get('/', getHome);

router.get('/timeline', isAuthenticated, getTimeline);

router.get('/roadmaps', getRoadmaps)

router.get('/news', getNews)

module.exports = router;
