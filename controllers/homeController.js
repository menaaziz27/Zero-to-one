const axios = require('axios');
const moment = require('moment');
const User = require('../models/User');
const Post = require('../models/Post');
const Roadmap = require('../models/Roadmap');

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
	// const data = await axios.get('https://dev.to/api/articles');
	// const news = data.data;
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
			news: '',
		});
	} catch (e) {
		console.log(e);
	}
};

exports.getRoadmaps = async (req, res, next) => {
	try {
		const roadmaps = await Roadmap.find({});
		console.log(roadmaps);

		res.render('roadmaps/roadmaps', {
			roadmaps,
		});
	} catch (e) {
		console.log(e);
	}
};

// exports.getNews = async (req, res) => {
// 	const data = await axios.get('https://dev.to/api/articles');

// 	const news = data.data;
// 	res.render('news', {
// 		title: 'News',
// 		news: news,
// 	});
// };

exports.getSearch = (req, res) => {
	res.render('final_search.ejs');
};

exports.getSearchPosts = (req, res) => {
	res.render('searchPosts.ejs');
};

exports.postSearchPosts = async (req, res) => {
	const { query } = req.body;
	console.log(query);
	try {
		const posts = await Post.aggregate([
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
							user: {
								$regex: query,
								$options: 'i',
							},
						},
					],
				},
			},
		]);
		//! this line is tricky :D
		const populatedPosts = await Post.populate(posts, { path: 'user' });
		console.log(populatedPosts);
		const defaultImage = 'assets/img/default.png';
		const modifiedPosts = populatedPosts
			.map(
				match =>
					`
				
				<div class="card card-body mb-1">
					<div>
						<a href="/users/profile/${match.user.username}">
							<img class="rounded-circle avatar-xs rounded float-left" src="/${
								match.user.Image || defaultImage
							}" width="100" height="75">
						</a>
					</div>
					<a href="/users/profile/${match.user.username}">
          <h4>${match.description} (${
						match.user.email
					})<span class="text-primary">${match.readingTime} ${
						match.hashtags[0]
					}</span></h4>
					</a>
        </div>
      `
			)
			.join('');
		// console.log(modifiedUsers);
		res.send({ modifiedPosts });
	} catch (e) {
		console.log(e);
	}
};

// $lookup is the same as populate but used with aggregate
// exports.postSearchPosts = async (req,res) => {
// 	const { query } = req.body;
// 	console.log(query)
// 		try {
// 			const posts = await Post.aggregate(
// 			[{
// 				$match: {
// 					$or: [{
// 						description: {
// 						$regex: query,
// 						'$options': 'i'
// 					}}, {
// 						hashtags: {
// 							$regex: query,
// 							'$options': 'i'
// 						}
// 					}]
// 					}
// 			}, {
//         $lookup: {
//             from: "User",
//             localField: "user",
//             foreignField: "_id",
//             as: "userdoc"
//         }
//     }]
// 		);
// 		// console.log(posts)
// 		const defaultImage = "assets/img/default.png"
// 		//! response is being sent before the function finish execution
// 		let modifiedPosts = await posts.map(async (post) => {
// 			let postOwner, markup;
// 			const pickedPost = await Post.findOne({user: post.user}).populate('user');
// 				console.log(pickedPost.user)
// 				markup = `<div class="card card-body mb-1">
// 						<div>
// 							<a href="/users/profile/${pickedPost.user.username}">
// 								<img class="rounded-circle avatar-xs rounded float-left" src="/" width="100" height="75">
// 							</a>
// 						</div>
// 						<a href="/users/profile/${pickedPost.user.username}">
// 						<h4>${post.description} (${pickedPost.user.username})<span class="text-primary">${post.readingTime}</span></h4>
// 						</a>
// 					</div>
// 				`
// 			// console.log(postOwner)
// 		return markup;
// 		});
// 		modifiedPosts = await modifiedPosts.join('');
// 		console.log(modifiedPosts, '1111111111111111111111111111111115')
// 		res.send({modifiedPosts})
// 	} catch (e) {
// 		console.log(e);
// 	}
// }

//! lessa ha3melha
exports.postSearchAjax = (req, res, next) => {
	// if it's not an ajax request go to the next middleware
	if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
		return next();
	}
	const { name, country, year, gender, language, skills } = req.body.allData;
	console.log(req.body.allData, 'alldata');
	console.log(name, 'name');
	console.log(country, 'country');
	console.log(year, 'year');
	console.log(gender, 'gender');
	console.log(skills, 'skills');
	try {
		res.redirect('/search');
	} catch (e) {
		console.log(e);
	}
};

exports.postSearch = async (req, res, next) => {
	if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
		next();
	}
	const { body } = req;
	console.log(body);
	try {
		// const users = await User.aggregate([
		// 	{
		// 		$match: {
		// 			$or: [
		// 				{
		// 					name: {
		// 						$regex: query,
		// 						$options: 'i',
		// 					},
		// 				},
		// 				{
		// 					email: {
		// 						$regex: query,
		// 						$options: 'i',
		// 					},
		// 				},
		// 				{
		// 					username: {
		// 						$regex: query,
		// 						$options: 'i',
		// 					},
		// 				},
		// 				{
		// 					bio: {
		// 						$regex: query,
		// 						$options: 'i',
		// 					},
		// 				},
		// 				{
		// 					country: {
		// 						$regex: query,
		// 						$options: 'i',
		// 					},
		// 				},
		// 			],
		// 		},
		// 	},
		// ]);
		// const defaultImage = 'assets/img/default.png';
		// const modifiedUsers = users
		// 	.map(
		// 		match =>
		// 			`

		// 		<div class="card card-body mb-1">
		// 			<div>
		// 				<a href="/users/profile/${match.username}">
		// 					<img class="rounded-circle avatar-xs rounded float-left" src="/${
		// 						match.Image || defaultImage
		// 					}" width="100" height="75">
		// 				</a>
		// 			</div>
		// 			<a href="/users/profile/${match.username}">
		//       <h4>${match.name} (${match.email})<span class="text-primary">${
		// 				match.username
		// 			}</span></h4>
		// 			</a>
		//     </div>
		//   `
		// 	)
		// 	.join('');
		// console.log(modifiedUsers);
		// res.send({ modifiedUsers });
		res.redirect('/search');
		// res.send({modifiedUsers})
	} catch (e) {
		console.log(e);
	}
};

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
