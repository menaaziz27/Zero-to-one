// ============ Node-Packages ============
const router = require('express').Router();

const {
	getNotifications,
	markAsOpened,
} = require('../controllers/notificationsApiController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getNotifications);
router.put('/:id/markAsOpened', markAsOpened);

module.exports = router;
