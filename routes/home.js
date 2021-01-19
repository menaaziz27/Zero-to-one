// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/', homeController.getHome);

module.exports = router;
