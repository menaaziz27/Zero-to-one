// ============ Node-Packages ============
const router = require('express').Router();

const { createChat,getChat } = require('../controllers/chatController');

router.post('/', createChat);
router.get('/',getChat );


module.exports = router;
