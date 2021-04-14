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
		// console.log(req.query.timeline,'39')
		if (req.query.timeline) {
			res.redirect('/timeline');
		} else {
			res.redirect('/users/profile/' + req.session.user.username);
		}
	} catch (e) {
		console.log(e);
	}
};

// /posts/:id
exports.getPostDetail = async (req, res, next) => {
	let timeline = req.query.timeline || false;
	const postId = req.params.id;

	try {
		const post = await Post.findById(postId).populate('user');
		// if the post is deleted go to the 404 page
		if (post === null) {
			res.locals.error = 'This post is deleted recently';
			next();
		}
		res.render('post/details-post', {
			post: post || '',
			timeline,
		});
	} catch (e) {
		console.log(e);
	}
};
// posts/:id/delete
exports.deletePost = async (req, res) => {
	const postId = req.params.id;

	try {
		await Post.findByIdAndDelete(postId);
		if (req.query.timeline) {
			res.redirect('/timeline');
		} else {
			res.redirect('/users/profile/' + req.session.user._id.toString());
		}
	} catch (e) {
		console.log(e);
	}
};

// Create
// localhost:3000/posts?timeline=true
exports.createPost = async (req, res) => {
	const { post } = req.body;
	let userId = req.session.user._id;

	const data = {
		user: req.session.user,
		description: post.trim(),
		hashtags: findHashtags(post),
	};

	try {
		let newPost = await Post.create(data);
		newPost = await Post.populate(newPost, { path: 'user' });
		return res.status(201).send({ newPost, userId });
	} catch (e) {
		console.log(e);
	}
};

exports.getPosts = async (req, res) => {
	try {
		const posts = await Post.find({}).sort({ createdAt: -1 }).populate('user');
		return res.status(200).send({ posts, userId: req.session.user._id });
	} catch (e) {
		console.log(e);
	}
};

// !
// PUT /posts/:id/like
exports.postLike = async (req, res) => {
	var postId = req.params.id;
	var userId = req.session.user._id;

	var isLiked = req.user.likes.length > 0 && req.user.likes.includes(postId);

	console.log(isLiked);

	var option = isLiked ? '$pull' : '$addToSet';

	// Insert user like
	req.session.user = await User.findByIdAndUpdate(
		userId,
		{ [option]: { likes: postId } },
		{ new: true }
	).catch(error => {
		console.log(error);
		res.sendStatus(400);
	});

	// Insert post like
	var post = await Post.findByIdAndUpdate(
		postId,
		{ [option]: { likes: userId } },
		{ new: true }
	).catch(error => {
		console.log(error);
		res.sendStatus(400);
	});

	res.status(200).send(post);
};
