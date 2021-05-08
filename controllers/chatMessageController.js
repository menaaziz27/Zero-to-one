const mongoose = require('mongoose');
const Chat = require('../models/Chat');
const User = require('../models/User');
const Message = require('../models/Message');

exports.createMessage = async (req, res) => {
  if(!req.body.content || !req.body.chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
}

var newMessage = {
    sender: req.session.user._id,
    content: req.body.content,
    chat: req.body.chatId
};
try{
 let message= await Message.create(newMessage)
  res.send(message);
}catch(e){
console.log(e)
}
}