// ============ Node-Packages ============
const router = require('express').Router();

const {
	createChat,
	getChat,
	updateChatName,
	getSingleChat,
  getSingleChatMessages
} = require('../controllers/chatController');

router.post('/', createChat);
router.get('/', getChat);
router.put('/:chatId', updateChatName);
router.get('/:chatId', getSingleChat);
router.get('/:chatId/messages', getSingleChatMessages);


module.exports = router;
