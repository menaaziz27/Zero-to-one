// ============ Node-Packages ============
const router = require('express').Router();

const {
	getNotifications,
} = require('../controllers/notificationsApiController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getNotifications);

module.exports = router;
