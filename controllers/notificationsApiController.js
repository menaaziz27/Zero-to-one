const User = require('../models/User');
const Post = require('../models/Post');
const axios = require('axios');
const Roadmap = require('../models/Roadmap');
const Notification = require('../models/Notification');
exports.getNotifications = async (req, res, next) => {
	try {
		const notifications = await Notification.find({
			userTo: req.session.user._id,
			notificationType: { $ne: 'newMessage' },
		})
			.populate('userTo')
			.populate('userFrom')
			.sort({ createdAt: -1 });

		res.status(200).send(notifications);
	} catch (e) {
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		next(e);
	}
};
exports.markAsOpened = async (req, res, next) => {
	try {
		const notifications = await Notification.findByIdAndUpdate(req.params.id, {
			opened: true,
		});
		console.log('markasopened controller');
		res.sendStatus(204);
	} catch (e) {
		if (!e.statusCode) {
			e.statusCode = 500;
		}
		next(e);
	}
};
