const axios = require('axios');
const moment = require('moment');
const User = require('../models/User');
const Post = require('../models/Post');
const Roadmap = require('../models/Roadmap');
const { renderUsers, generateCriteriaObject } = require('../middleware/helper');

exports.getHome = async (req, res, next) => {
	let userid;
	if (req.user) {
		userid = req.user._id.toString();
	} else {
		userid = null;
	}

	const roadmaps = await Roadmap.find({});
	res.render('home/index', { userid, roadmaps });
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
		res.render('home/timeline', {
			userid: userid,
			pageTitle: 'Timeline',
			news: news,
			user: req.session.user,
			postDetail: false,
		});
	} catch (e) {
		console.log(e);
	}
};

exports.explore = async (req, res, next) => {
	const data = await axios.get('https://dev.to/api/articles');
	const news = data.data;
	let userid;
	if (req.user) {
		userid = req.user._id.toString();
	} else {
		userid = null;
	}
	res.render('home/explore', {
		pageTitle: 'Explore',
		userid: userid,
		news: news,
		user: req.session.user,
		postDetail: false,
	});
};

exports.getNews = async (req, res) => {
	const data = await axios.get(
		'https://dev.to/api/articles?per_page=100&tags=javascript, css, react, web, coding&top=5'
	);

	const news = data.data;
	res.render('news/news', {
		title: 'News',
		news: news,
		pageTitle: 'News',
	});
};

exports.getSearch = async (req, res) => {
	try {
		const roadmaps = await Roadmap.find({});
		res.render('search/final_search.ejs', {
			users: [],
			roadmaps,
		});
	} catch (e) {
		console.log(e);
	}
};

exports.postSearch = async (req, res, next) => {
	let name, yearOfBirth, language, country, gender, skills, body;
	if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
		allData = req.body.allData;
	}
	// console.log(allData, 'alldataaaaaaaaaaaaaaaaaaaaaa');
	allData = generateCriteriaObject(allData);
	// console.log(allData, 'QUERY DATAAAAAAA');

	try {
		const users = await User.find(allData, { password: 0 });
		const roadmaps = await Roadmap.find({});
		// console.log(users);

		//TODO-1: check if the  request is ajax create string of matched elements in backticks string
		//TODO-2: send users back to ajax and target the DOM element and replace it's HTML with the string
		//TODO-3: if the request not ajax just res.render with the list of returning users
		let matchedUsers;
		if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
			// TODO-1: chck if the users array is empty => let matchedList = ''
			// TODO-1: if it's not empty loop with map() and send matched
			if (users.length !== 0) {
				matchedUsers = users.map(renderUsers).join('');
			} else {
				matchedUsers = '';
			}
			res.send({ users: matchedUsers });
		}
	} catch (e) {
		console.log(e);
	}
};

exports.getSearchPosts = (req, res) => {
	res.render('search/searchPosts.ejs', {
		modifiedPosts: '',
		posts: [],
		moment,
		query: '',
		user: req.session.user,
	});
};

exports.postSearchPosts = async (req, res) => {
	const { query } = req.body;
	const { skip, limit } = req.query;
	try {
		const page = +req.query.page || '1';
		const allPosts = await Post.aggregate([
			{
				$match: {
					$or: [
						{
							description: {
								$regex: query,
								$options: 'i',
							},
						},
						{
							hashtags: {
								$regex: query,
								$options: 'i',
							},
						},
						{
							hashtag: {
								$in: [query],
							},
						},
					],
				},
			},
		])
			.sort({ createdAt: -1 })
			.skip(Number(skip))
			.limit(Number(limit));
		const numPosts = await Post.find().countDocuments();
		totalItems = numPosts;
		//! this line is tricky :D
		const posts = await Post.populate(allPosts, { path: 'user' });
		return res.send({ posts });
	} catch (e) {
		console.log(e);
	}
};

exports.getUsers = async (req, res) => {
	var searchObj = req.query;

	if (req.query.search !== undefined) {
		searchObj = {
			$or: [
				{ name: { $regex: req.query.search, $options: 'i' } },
				{ username: { $regex: req.query.search, $options: 'i' } },
			],
		};
	}
	User.find(searchObj)
		.then(results => {
			res.status(200).send(results);
		})
		.catch(error => {
			console.log(error);
			res.sendStatus(400);
		});
};
