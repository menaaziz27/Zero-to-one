const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: [true, "Please enter the content"]
	},
  references: [String],
  roadmap:{type:Schema.Types.ObjectId, ref:'roadmap'}

});

module.exports = Topic = mongoose.model("topic", topicSchema);
