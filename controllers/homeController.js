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
// exports.postSearchAjax = (req, res, next) => {
// 	// if it's not an ajax request go to the next middleware
// 	if (req.headers['x-requested-with'] !== 'XMLHttpRequest') {
// 		return next();
// 	}
// 	const { name, country, year, gender, language, skills } = req.body.allData;
// 	console.log(req.body.allData, 'alldata');
// 	console.log(name, 'name');
// 	console.log(country, 'country');
// 	console.log(year, 'year');
// 	console.log(gender, 'gender');
// 	console.log(skills, 'skills');
// 	try {
// 		res.redirect('/search');
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

const generateCriteriaObject = obj => {
	let data = {};
	// delete all properties that have values of 'any'
	for (let prop in obj) {
		// if the property is empty string or 'any' or skills array is empty delete them
		if (obj[prop] === 'any' || obj[prop] === '' || obj[prop].length === 0) {
			delete obj[prop];
		}
		// lw el prop = name w el name msh empty 7ott el query bta3t el search f el obj data
		if (prop === 'name' && obj[prop] !== '') {
			data['$text'] = { $search: `${obj[prop]}` };
		} else if (prop === 'skills' && obj[prop]?.length > 0) {
			data[prop] = { skills: { $in: `${obj[prop]}` } };
		} else if (obj[prop] !== undefined) {
			data[prop] = obj[prop];
		}
	}
	return data;
};

exports.postSearch = async (req, res, next) => {
	//TODO-1: extract both data from ajax and from the form
	//TODO-2: format both objects to match each others
	//TODO-3: format the query that gonna undergoes to the search in DB
	//TODO-4: get the list of users that match this query or criteria
	//TODO-5: adjust the ejs cards for users
	//TODO-6: make a loading spinner that loads before rendering users to the client

	let name, year, language, country, gender, skills, body;
	if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
		allData = req.body.allData;
	} else {
		allData = req.body;
		// console.log(req.body, 'body');
		// if skills length is 1 that means it has one value which will be string
		if (typeof allData.skills === 'string') {
			body.skills = [body.skills];
		}
		if (allData.skills === undefined) {
			allData.skills = [];
		}
	}
	console.log(allData, 'alldataaaaaaaaaaaaaaaaaaaaaa');
	allData = generateCriteriaObject(allData);
	console.log(allData, 'alldataaaaaaaaaaaaaaaaaaaaaa');

	try {
		const users = await User.find(allData);
		console.log(users);
		res.redirect('/search');
	} catch (e) {
		console.log(e);
	}
	// name = allData?.name;
	// country = allData?.country;
	// year = allData?.year;
	// language = allData?.language;
	// gender = allData?.gender;
	// skills = allData?.skills;
	// console.log(req?.body?.allData, 'alldata');
	// console.log(name, 'name');
	// console.log(country, 'country');
	// console.log(year, 'year');
	// console.log(gender, 'gender');
	// console.log(skills, 'skills');

	// console.log(body, 'All BODY DATA');
	// console.log(allData, 'All BODY allData DATA');

	// format incoming object to the criteria query
	// const criteria = generateCriteriaObject();

	// console.log(body.skills, 'skills after modifications');
	// try {
	// 	const users = await User.aggregate([
	// 		{
	// 			$match: {
	// 				$or: [
	// 					{
	// 						name: {
	// 							$regex: new RegExp(`^${name}`),
	// 							$options: 'i',
	// 						},
	// 					},
	// 					{
	// 						country: {
	// 							$regex: new RegExp(`^${country}`),
	// 							$options: 'i',
	// 						},
	// 					},
	// 					{
	// 						yearOfBirth: {
	// 							$regex: new RegExp(`^${year}`),
	// 							$options: 'i',
	// 						},
	// 					},
	// 					{
	// 						nativeLang: {
	// 							$regex: new RegExp(`^${language}`),
	// 							$options: 'i',
	// 						},
	// 					},
	// 					// {
	// 					// 	skills: {
	// 					// 		$regex: query,
	// 					// 		$options: 'i',
	// 					// 	},
	// 					// },
	// 				],
	// 			},
	// 		},
	// 	]);

	// 	console.log(users, 'users');
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
	// res.redirect('/search');
	// res.send({modifiedUsers})
	// } catch (e) {
	// 	console.log(e);
	// }
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
