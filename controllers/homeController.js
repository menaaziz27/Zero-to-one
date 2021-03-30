const axios = require('axios');
const moment = require('moment');
const User = require('../models/User');
const Post = require('../models/Post');
const { Error } = require('mongoose');

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
	res.render('search2.ejs');
};

exports.postSearch = async (req, res) => {
	const { query } = req.body;
	console.log(query)
		try {
		const users = await User.aggregate(
			[{
				$match: {
					$or: [{
						name: {
						$regex: query,
						'$options': 'i'
					}}, {
						email: {
							$regex: query,
							'$options': 'i'
						}
					},{
						username: {
							$regex: query,
							'$options': 'i'
						}
					},{
						bio: {
							$regex: query,
							'$options': 'i'
						}
					},{
						country: {
							$regex: query,
							'$options': 'i'
						}
					}]
					}
			}]
		);
		const defaultImage = "assets/img/default.png"
		const modifiedUsers = users.map(match => 
			`
				
				<div class="card card-body mb-1">
					<div>
						<a href="/users/profile/${match.username}">
							<img class="rounded-circle avatar-xs rounded float-left" src="/${match.Image || defaultImage}" width="100" height="75">
						</a>
					</div>
					<a href="/users/profile/${match.username}">
          <h4>${match.name} (${match.email})<span class="text-primary">${match.username}</span></h4>
					</a>
        </div>
      `).join('')
			console.log(modifiedUsers);
		res.send({modifiedUsers})
		// res.send({modifiedUsers})
	} catch (e) {
		console.log(e);
	}
}

//! partial search working
// exports.postSearch = async (req, res) => {
// 	const query = req.body.search;
// 	try {
// 		const users = await User.aggregate(
// 			[{
// 				$match: {
// 					$or: [{
// 						name: {
// 						$regex: query,
// 						'$options': 'i'
// 					}}, {
// 						email: {
// 							$regex: query,
// 							'$options': 'i'
// 						}
// 					},{
// 						username: {
// 							$regex: query,
// 							'$options': 'i'
// 						}
// 					},{
// 						bio: {
// 							$regex: query,
// 							'$options': 'i'
// 						}
// 					},{
// 						country: {
// 							$regex: query,
// 							'$options': 'i'
// 						}
// 					}]
// 					}
// 			}]
// 		);
// 		console.log(users);
// 		res.redirect('/search');
// 		// console.log(users);
// 	} catch (e) {
// 		console.log(e);
// 	}
// };


// partial search regex

// exports.postSearch = async (req, res) => {
// 	const query = req.body.search;
// 	try {
// 		const users = await User.find({ name: {$regex: new RegExp(query) }}, 
// 		{
// 			_id:0,
// 			__v:0
// 		}, function(err, users) {
// 			if(err) return console.log(err);
// 			console.log(users)
// 		}
// 		);
// 		// console.log(users);
// 		res.redirect('/search');
// 		// console.log(users);
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

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
