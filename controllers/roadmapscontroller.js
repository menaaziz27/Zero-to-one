const Roadmap = require('../models/Roadmap');
const Topic = require('../models/Topic');

exports.getRoadmaps = async (req, res, next) => {
	try {
		const roadmaps = await Roadmap.find({});

		res.render('roadmaps/roadmaps', {
			roadmaps,
		});
	} catch (e) {
		console.log(e);
	}
};

exports.createRoadmap = async (req, res) => {
	try {
		const newRoadmap = new Roadmap({
			title: title,
			description: description,
			steps: steps,
		});
		await newRoadmap.save();
	} catch (e) {
		console.log(e);
	}
};

// roadmaps/:roadmap
exports.getRoadmap = async (req, res, next) => {
	const roadmapName = req.params.roadmap;
	let count = 1;
	try {
		const roadmap = await Roadmap.findOne({ routeName: roadmapName }).populate(
			'steps'
		);
		if (!roadmap) {
			const error = new Error(
				'Roadmap is not found. It may be deleted recently.'
			);
			error.statusCode = 404;
			return next(error);
		}
		//! optional chaining
		console.log(roadmap);
		//!roadmap?.steps
		const steps = roadmap.steps;
		//!steps[0]?.title
		console.log(steps[0]?.title);
		res.render('roadmaps/diagram', {
			roadmap,
			steps,
			count,
		});
	} catch (e) {
		console.log(e);
	}
};

exports.gettopic = async (req, res, next) => {
	let referencee;
	const topicName = req.params.topic;

	try {
		const topic = await Topic.findOne({ routeName: topicName }).populate(
			'roadmaps'
		);
		if (!topic) {
			const error = new Error(
				'Topic is not found. It may be deleted recently.'
			);
			error.statusCode = 404;
			return next(error);
		}
		// console.log(roadmap);
		const roadmaps = topic.roadmaps;
		res.render('roadmaps/topic', {
			topic,
			roadmaps,
			referencee,
		});
	} catch (e) {
		console.log(e);
	}
};
