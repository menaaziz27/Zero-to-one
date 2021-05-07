const Chat = require('../models/Chat');
exports.createChat = async (req, res) => {
	if (!req.body.users) {
		return alert('no users sent');
	}

	let users = JSON.parse(req.body.users);

	if (users.length === 0) {
		console.log('users array is empty');
	}

	users.push(req.session.user);

	let chatData = {
		users,
		isGroupChat: true,
	};

	try {
		const chat = await Chat.create(chatData);
		return res.send(chat);
	} catch (e) {
		console.log(e);
	}
};

exports.getChat = async (req, res) => {
	try {
		const result = await Chat.find({
			users: { $elemMatch: { $eq: req.session.user._id } },
		})
			.populate('users')
			.sort({ updatedAt: -1 });
		return res.send(result);
	} catch (e) {
		console.log(e);
	}
};

// PUT /chats/:chatId
exports.updateChatName = async (req, res) => {
	// req.body = { chatName: "whatever the new name is" }
	try {
		const result = await Chat.findByIdAndUpdate(req.params.chatId, req.body);
		return res.sendStatus(204);
	} catch (e) {
		console.log(e);
	}
};

// GET /chats/:chatId
exports.getSingleChat = async (req, res) => {
	try {
		const chat = await Chat.findOne({
			_id: req.params.chatId,
			users: { $elemMatch: { $eq: req.session.user._id } },
		})
			.populate('users')
			.sort({ updatedAt: -1 });
		return res.send(chat);
	} catch (e) {
		console.log(e);
	}
};
