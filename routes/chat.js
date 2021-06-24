// ============ Node-Packages ============
const router = require('express').Router();

const {
	createChat,
	getChat,
	updateChatName,
	getSingleChat,
	getSingleChatMessages,
	markMessagesAsRead,
} = require('../controllers/chatController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.post('/', createChat);
router.get('/',isAuthenticated, getChat);
router.put('/:chatId', updateChatName);
router.get('/:chatId',isAuthenticated, getSingleChat);
router.get('/:chatId/messages',isAuthenticated, getSingleChatMessages);
router.put('/:chatId/messages/markAsRead', markMessagesAsRead);

module.exports = router;
