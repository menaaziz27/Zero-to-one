// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const {
    getHome,
    getRoadmaps,
    getNews
} = require('../controllers/homeController');

const router = express.Router();

//! adjust home route for auth and other for unAuth
router.get('/', getHome);

router.get('/roadmaps', getRoadmaps)

router.get('/news', getNews)

module.exports = router;
