const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // username:{ 
    //     type: String,
    //     required: true,
    //     unique: true
    // },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Image: String,
  name: String,
  bio: String,
  resetToken: String,

  resetTokenExpiration: Date,
});

module.exports = mongoose.model('User', userSchema);
