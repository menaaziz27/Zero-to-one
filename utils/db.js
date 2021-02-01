const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost:27017/zerotoone", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("connected!");
	})
	.catch((err) => console.log(err));
