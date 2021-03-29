const Roadmap = require('../models/Roadmap');


exports.createRoadmap = async (req, res) => {
  const title = req.body.title;
	const description = req.body.description;
  const steps = req.body.steps
	try {
		const newRoadmap = new Roadmap({
			title: title,
			description: description,
      steps : steps
		});
		await newRoadmap.save();
	} catch (e) {
		console.log(e);
	}
};
