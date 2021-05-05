// ============ Node-Packages ============
const router = require('express').Router();

const { createChat } = require('../controllers/chatController');

router.post('/', createChat);

module.exports = router;
