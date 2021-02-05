const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
});

module.exports = mongoose.model("User", userSchema);
