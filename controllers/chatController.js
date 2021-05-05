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
		const result= await Chat.find({users:{ $elemMatch : {$eq :req.session.user._id}}}).populate('users');
		return res.send(result);
	} catch (e) {
		console.log(e);
	}
};