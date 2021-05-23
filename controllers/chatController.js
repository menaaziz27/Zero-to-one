const Chat = require('../models/Chat');
const User = require('../models/User');
const Message = require('../models/Message');
const mongoose = require('mongoose');


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
		let result = await Chat.find({
			users: { $elemMatch: { $eq: req.session.user._id } },
		})
			.populate('users')
			.populate('latestMessage')
			.sort({ updatedAt: -1 });
		result = await User.populate(result, { path: 'latestMessage.sender' });
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
		let chat = await Chat.findOne({
			_id: req.params.chatId,
			users: { $elemMatch: { $eq: req.session.user._id } },
		})
			.populate('users')
			.sort({ updatedAt: -1 });
      if(!chat){
        const otheruser =req.params.chatId
        let userFound = await User.findById(otheruser);
        let userId =req.session.user._id
        if (userFound) {
          chat = await getChatByUserId(userId, userFound._id);
          console.log(chat._id ,555555555555555)
        }
      }
		return res.send(chat);
	} catch (e) {
		console.log(e);
	}
};

// GET /chats/:chatId/messages`
exports.getSingleChatMessages = async (req, res) => {
	try {
		const messages = await Message.find({ chat: req.params.chatId }).populate(
			'sender'
		);
    console.log(messages ,77777777777)

		return res.send(messages);
	} catch (e) {
		console.log(e);
	}
};

function getChatByUserId(userLoggedInId, anotherUserId) {
	return Chat.findOneAndUpdate(
		{
			isGroupChat: false,
			users: {
				$size: 2,
				$all: [
					{
						$elemMatch: {
							$eq: mongoose.Types.ObjectId(userLoggedInId),
						},
					},
					{
						$elemMatch: {
							$eq: mongoose.Types.ObjectId(anotherUserId),
						},
					},
				],
			},
		},
		{
			$setOnInsert: {
				users: [userLoggedInId, anotherUserId],
			},
		},
		{
			new: true,
			upsert: true,
		}
	).populate('users');
}

