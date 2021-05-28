const Roadmap = require('../models/Roadmap');
const Topic = require('../models/Topic');
const User = require('../models/User');

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
	const userid = req.session.user._id;
	let count = 1;
	try {
		const roadmap = await Roadmap.findOne({ routeName: roadmapName }).populate(
			'steps'
		);
		const user = await User.findById({ _id: userid }).populate('bookmarks');
		if (!roadmap) {
			const error = new Error(
				'Roadmap is not found. It may be deleted recently.'
			);
			error.statusCode = 404;
			return next(error);
		}
		const steps = roadmap.steps;
		res.render('roadmaps/diagram', {
			roadmap,
			steps,
			count,
			user,
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

exports.postBookmark = async (req, res, next) => {
	const data = req.body;
	var userId = req.session.user._id;

	try {
		const roadmap = await Roadmap.findOne(data);
		let user = await User.findOne({ _id: userId }).populate('bookmarks');
		let isexist =
			user.bookmarks &&
			user.bookmarks.some(road => road.title === roadmap.title);
		let option = isexist ? '$pull' : '$addToSet';
		console.log(isexist);
		console.log(option);
		console.log(roadmap);

		await User.findByIdAndUpdate(
			userId,
			{
				[option]: { bookmarks: roadmap._id },
			},
			{ new: true }
		)
			.populate('bookmarks')
			.catch(error => {
				console.log(error);
				res.sendStatus(400);
			});

		//   if (!user.bookmarks.some(road => road.title === roadmap.title)) {
		//     user.bookmarks.push(roadmap)
		//     await user.save();
		// }
		return res.status(201).send(req.session.user);
	} catch (e) {
		console.log(e);
	}
};
