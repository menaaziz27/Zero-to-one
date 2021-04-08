const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: String,
	bio: String,
	Image: String,
	yearOfBirth: String,
	gender: String,
	skills: [],
	websites: [String],
	country: String,
	nativeLang: String,
	resetToken: String,
	resetTokenExpiration: Date,
	posts: [postSchema],
});

userSchema.methods.hidePrivateData = function () {
	const user = this;

	const userObject = user.toObject();

	delete userObject.password;
	return userObject;
};

module.exports = mongoose.model('User', userSchema);
