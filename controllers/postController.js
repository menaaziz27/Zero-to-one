const Post = require('../models/Post');
const User = require('../models/User');
const findHashtags = require('find-hashtags');

// /posts/:id/details
exports.getEdit = async (req, res) => {
	// if there's timeline query in the request let timeline = true else False
	let timeline = req.query.timeline || false;
	const postId = req.params.id;
	let userid = req.user._id || null;
	try {
		const post = await Post.findById(postId);
		res.render('post/edit-post', {
			post,
			userid,
			timeline,
		});
	} catch (e) {
		console.log(e);
	}
};

// /posts/:id/edit
exports.postEdit = async (req, res) => {
	const postId = req.params.id;
	const { userid, description } = req.body;

	try {
		await Post.findByIdAndUpdate(postId, {
			user: userid,
			description: description,
			readingTime:
				Math.floor(description.split(' ').length / 100) === 0
					? 1
					: Math.floor(description.split(' ').length / 100),
			hashtags: findHashtags(description),
		});
		// await editPost.save()
		if (req.query.timeline) {
			res.redirect('/timeline');
		} else {
			res.redirect('/users/profile/' + req.session.user.username);
		}
	} catch (e) {
		console.log(e);
	}
};

// DELETE /posts/:id
exports.deletePost = async (req, res) => {
	const postId = req.params.id;

	try {
		await Post.findByIdAndDelete(postId);
		res.sendStatus(202);
	} catch (e) {
		console.log(e);
	}
};

// Create
// localhost:3000/posts?timeline=true
exports.createPost = async (req, res) => {
	const { post } = req.body;
	const replyTo = req.body.replyTo;

	let userId = req.session.user._id;

	const data = {
		user: req.session.user,
		description: post.trim(),
		hashtags: findHashtags(post),
	};

	if (req.body.replyTo) {
		data.replyTo = req.body.replyTo;
		// update post comments number
		try {
			await Post.findOneAndUpdate({ _id: replyTo }, { $inc: { replies: 1 } });
		} catch (e) {
			console.log(e);
		}
	}

	try {
		let newPost = await Post.create(data);
		newPost = await Post.populate(newPost, { path: 'user' });
		return res.status(201).send({ newPost, userId });
	} catch (e) {
		console.log(e);
	}
};

exports.getPosts = async (req, res) => {
	const { skip } = req.query;
	const { limit } = req.query;
	delete req.query.skip;
	delete req.query.limit;

	var userId = req.session.user._id;
	let searchObj = req.query;
	console.log(req.query);

	// b-filter kol el posts elli feha field replyTo 3shan ana 3ayz el posts bs msh el comments
	if (searchObj.isReply !== undefined) {
		let isReply = searchObj.isReply == 'true';
		searchObj.replyTo = { $exists: isReply };
		delete searchObj.isReply;
	}

	if (searchObj.followingOnly !== undefined) {
		let followingOnly = searchObj.followingOnly == 'true';

		if (followingOnly) {
			let objectsIds = req.session.user.following;

			objectsIds.push(req.session.user._id);

			searchObj.user = { $in: objectsIds };
		}
		delete searchObj.followingOnly;
	}

	console.log(searchObj);

	var posts = await getPosts(searchObj, Number(skip), Number(limit));
	return res.status(200).send({ posts, userId });
};

// !
// PUT /posts/:id/like
exports.postLike = async (req, res) => {
	var postId = req.params.id;
	var userId = req.session.user._id;

	var isLiked = req.user.likes.length > 0 && req.user.likes.includes(postId);

	var option = isLiked ? '$pull' : '$addToSet';

	// Insert user like
	req.session.user = await User.findByIdAndUpdate(
		userId,
		{
			[option]: { likes: postId },
		},
		{ new: true }
	).catch(error => {
		console.log(error);
		res.sendStatus(400);
	});

	// Insert post like
	var post = await Post.findByIdAndUpdate(
		postId,
		{
			[option]: { likes: userId },
		},
		{ new: true }
	).catch(error => {
		console.log(error);
		res.sendStatus(400);
	});

	res.status(200).send(post);
};

// GET posts/:id
exports.getPost = async (req, res, next) => {
	var userId = req.session.user._id;
	var post = await getPosts({ _id: req.params.id });
	if (post) {
		post = post[0];
	}

	if (!post) {
		const error = new Error('This post is not found');
		error.statusCode = 404;
		return next(error);
	}

	let results = {
		post,
		postId: req.params.id,
		userId,
		user: req.session.user,
		postDetail: true,
	};

	if (post.replyTo !== undefined) {
		results.replyTo = post.replyTo;
	}

	results.replies = await getPosts({ replyTo: req.params.id });

	return res.status(200).send(results);
};

// /posts/:id/details
exports.getPostDetails = async (req, res, next) => {
	var userId = req.session.user._id;
	Post.findById(req.params.id)
		.then(post => {
			let payload = {
				postId: req.params.id,
				userId,
				user: req.session.user,
			};

			return res.status(200).render('post/post-details.ejs', payload);
		})
		.catch(err => {
			const error = new Error('Cannot find this post');
			error.statusCode = 404;
			return next(error);
		});
};

async function getPosts(criteria, skip = 0, limit = 1) {
	try {
		let results = await Post.find(criteria)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.populate('user')
			.populate('replyTo');

		return await User.populate(results, { path: 'replyTo.user' });
		// return res.status(200).send({ posts, userId: req.session.user._id });
	} catch (e) {
		console.log(e);
	}
}

// /posts/:id
// exports.getPostDetail = async (req, res, next) => {
// 	let timeline = req.query.timeline || false;
// 	const postId = req.params.id;

// 	try {
// 		const post = await Post.findById(postId).populate('user');
// 		// if the post is deleted go to the 404 page
// 		if (post === null) {
// 			res.locals.error = 'This post is deleted recently';
// 			next();
// 		}
// 		res.render('post/details-post', {
// 			post: post || '',
// 			timeline,
// 		});
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

// posts/:id/delete
// exports.deletePost = async (req, res) => {
// 	const postId = req.params.id;

// 	try {
// 		await Post.findByIdAndDelete(postId);
// 		if (req.query.timeline) {
// 			res.redirect('/timeline');
// 		} else {
// 			res.redirect('/users/profile/' + req.session.user._id.toString());
// 		}
// 	} catch (e) {
// 		console.log(e);
// 	}
// };
