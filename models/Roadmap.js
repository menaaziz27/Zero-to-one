const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roadmapSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	summary: {
		type: String,
		required: [true, 'summary required'],
	},
	description: {
		type: String,
		required: [true, 'Please enter the description'],
	},
	routeName: {
		type: String,
		required: [true, 'url required'],
	},
	routeName: {
		type: String,
		required: [true, 'url required'],
	},
	steps: [{ type: Schema.Types.ObjectId, ref: 'topic' }],
	// steps:[String]
});

const Roadmap = mongoose.model('roadmap', roadmapSchema);
module.exports = Roadmap;
