// ============ Node-Packages ============
const router = require('express').Router();

const {
	getMessages,
	newMessage,
} = require('../controllers/messagesController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getMessages);
router.get('/new', newMessage);

module.exports = router;
