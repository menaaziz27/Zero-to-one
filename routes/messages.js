// ============ Node-Packages ============
const router = require('express').Router();

const {
	getMessages,
	newMessage,
	getChatPage,
} = require('../controllers/messagesController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getMessages);
router.get('/new', newMessage);
router.get('/:chatId', getChatPage);

module.exports = router;
