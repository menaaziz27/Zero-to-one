const Roadmap = require('../models/Roadmap');


exports.createRoadmap = async (req, res) => {
  const title = req.body.title;
	const description = req.body.description;
	try {
		const newRoadmap = new Roadmap({
			title: title,
			description: description,
		});
		await newRoadmap.save();
	} catch (e) {
		console.log(e);
	}
};
