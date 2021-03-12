const mongoose = require('mongoose');

mongoose
	.connect('mongodb+srv://abdallah:abd12345@cluster0.itsjp.mongodb.net/ZeroToOne?&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected!');
	})
	.catch(err => console.log(err));
