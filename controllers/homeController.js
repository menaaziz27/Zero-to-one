const axios = require('axios');
const moment = require('moment');
const User = require('../models/User');

const Post = require('../models/Post');

exports.getHome = (req, res, next) => {
	let userid;
	if (req.user) {
		userid = req.user._id.toString();
	} else {
		userid = null;
	}
	res.render('home/index', { userid });
};

exports.getTimeline = async (req, res, next) => {
	const data = await axios.get('https://dev.to/api/articles');
	const news = data.data;
	let userid;
	if (req.user) {
		userid = req.user._id.toString();
	} else {
		userid = null;
	}
	try {
		const posts = await Post.find({}).sort({ createdAt: -1 }).populate('user');

		res.render('home/timeline', {
			userid: userid,
			posts,
			moment,
			news,
		});
	} catch (e) {
		console.log(e);
	}
};

exports.getRoadmaps = (req, res, next) => {
	res.render('roadmaps/roadmaps', {});
};

exports.getNews = async (req, res) => {
	const data = await axios.get('https://dev.to/api/articles');

	const news = data.data;
	res.render('news', {
		title: 'News',
		news: news,
	});
};

exports.getSearch = (req, res) => {
	res.render('search.ejs');
};

exports.getHtml = (req, res) => {
	res.render('html.ejs');
};
exports.getCss = (req, res) => {
	res.render('css.ejs');
};

exports.getDiagram = (req, res) => {
	res.render('roadmaps/diagram.ejs');
};
exports.getBackDiagram = (req, res) => {
	res.render('roadmaps/backend.ejs');
};
exports.getBioDiagram = (req, res) => {
	res.render('roadmaps/Bioinformatics.ejs');
};

exports.postSearch = async (req, res) => {
	const query = req.body.query;
	try {
		const users = await User.find({ name: query });
		console.log(users);
	} catch (e) {
		console.log(e);
	}
};
