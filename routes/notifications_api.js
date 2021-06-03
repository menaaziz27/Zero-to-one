// ============ Node-Packages ============
const router = require('express').Router();

const {
	getNotifications,
	markAsOpened,
	markManyAsOpened,
} = require('../controllers/notificationsApiController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getNotifications);
router.put('/:id/markAsOpened', markAsOpened);
router.put('/markAsOpened', markManyAsOpened);

module.exports = router;
