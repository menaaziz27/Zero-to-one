const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const Roadmap= require('../models/Roadmap');
const Topic= require('../models/Topic');

const moment = require('moment');


exports.getDashboard =  async (req,res) => {

	try {
		const users = await User.find({});
    const posts = await Post.find({});
		const roadmaps = await Roadmap.find({});
    const topics = await Topic.find({});
		res.render('dashboard/dashboard.ejs', {
			users,
      posts,
      roadmaps,
      topics
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
    const topics = await Topic.find({});


		res.render('dashboard/userdashboard.ejs', {
			users,
      posts,
      roadmaps,
      topics
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


//Roadmaps

exports.getRoadmapDashboard = async (req,res) => {

  try {
		const users = await User.find({});
    const posts = await Post.find({});
		const roadmaps = await Roadmap.find({});


		res.render('dashboard/roadmapDashboard.ejs', {
			users,
      posts,
      roadmaps
		});
	} catch (e) {
		console.log(e);
	}

}

exports.getCreateRoadmapDashboard =  (req,res) => {
		res.render('dashboard/addRoadmap.ejs',{
      errorMassage: null

    });

}

exports.postCreateRoadmapDashboard = async(req,res) => {
  const title = req.body.title;
	const summary = req.body.summary;
	const description = req.body.description;
	const routeName = req.body.routeName;
	const steps = req.body.steps;
  //  console.log(title)
  //  console.log(summary)
  //  console.log(description)
  //  console.log(routeName)
  //  console.log(steps)

   try {
		const roadmap = await new Roadmap()
    roadmap.title= title
    roadmap.summary= summary
    roadmap.description= description
    roadmap.routeName= routeName
    roadmap.steps= steps
    roadmap.save()
		res.redirect('/admin/dashboard/roadmaps');
	} catch (e) {
		console.log(e);
	}
}
exports.deleteRoadmap = async (req, res) => {
	const roadmapId = req.body.id;

	try {
		await Roadmap.findByIdAndDelete(roadmapId);
		res.redirect('/admin/dashboard/roadmaps');
	
	} catch (e) {
		console.log(e);
	}
};


//Topic dashboard

exports.getTopicDashboard = async (req,res) => {

  try {
	
		const topics = await Topic.find({}).populate('roadmap');
    const roadmaps = await Roadmap.find({});
    // console.log(topics)

		res.render('dashboard/topicDashboard.ejs', {
      topics,
      roadmaps
		});
	} catch (e) {
		console.log(e);
	}

}
exports.getCreateTopicDashboard =  async (req,res) => {
  try{
    const roadmaps = await Roadmap.find({});
    res.render('dashboard/addTopic.ejs',{
      errorMassage: null,
      roadmaps
  
    });

  }catch{
    console.log(e);

  }

}

exports.postCreateTopicDashboard = async(req,res) => {
  const title = req.body.title;
	const summary = req.body.summary;
	const description = req.body.description;
	const routeName = req.body.routeName;
	let references = req.body.references;
  const roadmaproute = req.body.roadmap
  
   try {
		const topic = await new Topic()
    topic.title= title
    topic.summary= summary
    topic.description= description
    topic.routeName= routeName
    topic.references= references
    const roadmap = await Roadmap.findOne({routeName :roadmaproute})
    topic.roadmap= roadmap
    topic.save()
		res.redirect('/admin/dashboard/topics');
	} catch (e) {
		console.log(e);
	}
}
exports.deleteTopic = async (req, res) => {
	const TopicId = req.body.id;

	try {
		await Topic.findByIdAndDelete(TopicId);
		res.redirect('/admin/dashboard/topics');
	
	} catch (e) {
		console.log(e);
	}
};

exports.getEditTopicDashboard = async (req,res) => {
  const topicId = req.params.id
  try {
		const topic = await Topic.findById({_id : topicId});
    const roadmaps = await Roadmap.find({});
    references = topic.references
    // console.log(topic.references)
		res.render('dashboard/editTopic.ejs', {
			topic,
      errorMassage: null,
      roadmaps,
      references
		});
	} catch (e) {
		console.log(e);
	}

}
exports.postEditTopicDashboard = async(req,res) => {
  const title = req.body.title;
	const summary = req.body.summary;
	const description = req.body.description;
	const routeName = req.body.routeName;
	let references = req.body.references;
  let roadmaproute = req.body.roadmap;

  const topicId = req.body.id

   try {
		const topic = await Topic.findById({_id : topicId});
    topic.title= title
    topic.summary= summary
    topic.description= description
    topic.routeName= routeName
    topic.references= references
    const roadmap = await Roadmap.findOne({routeName :roadmaproute})
    topic.roadmap= roadmap
    topic.save()
		res.redirect('/admin/dashboard/topics');
	} catch (e) {
		console.log(e);
	}
}