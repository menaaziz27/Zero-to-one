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

router.post('/', createChat);
router.get('/', getChat);
router.put('/:chatId', updateChatName);
router.get('/:chatId', getSingleChat);
router.get('/:chatId/messages', getSingleChatMessages);
router.put('/:chatId/messages/markAsRead', markMessagesAsRead);

module.exports = router;
