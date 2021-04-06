const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const Roadmap= require('../models/Roadmap');
const moment = require('moment');


exports.getDashboard =  async (req,res) => {

	try {
		const users = await User.find({});
    const posts = await Post.find({});
		const roadmaps = await Roadmap.find({});
		res.render('dashboard/dashboard.ejs', {
			users,
      posts,
      roadmaps
		});
	} catch (e) {
		console.log(e);
	}
}
// USer Dashboard

exports.getUserDashboard = async (req,res) => {

  try {
		const users = await User.find({});
    const posts = await Post.find({});
		const roadmaps = await Roadmap.find({});


		res.render('dashboard/userdashboard.ejs', {
			users,
      posts,
      roadmaps
		});
	} catch (e) {
		console.log(e);
	}

}
exports.deleteUser = async (req, res) => {
	const userId = req.body.id.toString();
	try {
		await User.findByIdAndDelete(userId);
			res.redirect('/admin/dashboard/users');
	} catch (e) {
		console.log(e);
	}
};
exports.getEditUserDashboard = async (req,res) => {
  const UserId = req.params.id
  try {
		const user = await User.findOne({_id : UserId});

		res.render('dashboard/userEdit.ejs', {
			user,
      errorMassage: null
		});
	} catch (e) {
		console.log(e);
	}

}
exports.postEditUserDashboard = async (req,res) => {
	const userid = req.body.userid;
	const name = req.body.name;
	const bio = req.body.bio;
	const country = req.body.country;
	const BirthDate = req.body.date_of_birth;
	const gender = req.body.gender;
	const skills = req.body.skills;
	const nativeLang = req.body.nativeLang;  
  
	let image;
	let Image;
	image = req.file;

	if (image !== undefined) {
		Image = image.path;
	}
  const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('dashboard/userEdit', {
			errorMassage: errors.array()[0].msg,
			name,
			userid: userid,
		});
	}
  try {
		const user = await User.findOne({_id : userid});
    user.name = name;
		user.bio = bio;
		user.country = country;
		user.yearOfBirth = BirthDate;
		user.gender = gender;
		if (skills !== undefined) {
			user.skills = skills;
		}
		user.nativeLang = nativeLang;

		//  console.log(image)
		if (image !== undefined) {
			user.Image = Image;
		}
		user.save();
		res.redirect('/admin/dashboard/users');
	} catch (e) {
		console.log(e);
	}

}

//Post Dashboard
exports.getPostDashboard = async (req,res) => {

  try {
		const users = await User.find({});
    const posts = await Post.find({}).sort({ createdAt: -1 }).populate('user');;
		const roadmaps = await Roadmap.find({});
		res.render('dashboard/postsdashboard.ejs', {
			users,
      posts,
      roadmaps,
      moment
		});
	} catch (e) {
		console.log(e);
	}
}
exports.deletePost = async (req, res) => {
	const postId = req.body.id;

	try {
		await Post.findByIdAndDelete(postId);
		res.redirect('/admin/dashboard/posts');
	
	} catch (e) {
		console.log(e);
	}
};

exports.getEditPostDashboard = async (req,res) => {
  const postId = req.params.id
  try {
		const post = await Post.findById({_id : postId});
    console.log(post)

		res.render('dashboard/postEdit.ejs', {
			post,
      errorMassage: null
		});
	} catch (e) {
		console.log(e);
	}

}
exports.postEditPostDashboard = async (req,res) => {
  const postId = req.body.postid
  const description = req.body.description
  try {
		const post = await Post.findById({_id : postId});
   post.description= description
   post.save()
		res.redirect('/admin/dashboard/posts');
	} catch (e) {
		console.log(e);
	}

}
