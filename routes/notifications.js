const router = require('express').Router();

const { getNotifications } = require('../controllers/notificationsController');

router.get('/', getNotifications);

module.exports = router;
