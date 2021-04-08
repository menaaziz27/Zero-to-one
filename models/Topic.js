const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
  summary:{
    type:String,
    required: [true, 'summary required']
  },
	description: {
		type: String,
		required: [true, "Please enter the description"]
	},
  routeName:{
    type:String,
    required: [true, 'url required']
  },
  references: [String],
  roadmap:{type:Schema.Types.ObjectId, ref:'roadmap'}
});

const Topic = mongoose.model("topic", topicSchema);
module.exports = Topic;
