const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roademapSchema = new Schema({
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
  url:String,
  steps: [{
    // type: Schema.Types.ObjectId, ref:'topic'
    title:String
  }]

});

module.exports = mongoose.model("roadmap", roademapSchema);
