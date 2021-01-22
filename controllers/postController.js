const Post = require('../models/Post');
exports.getPost = (req,res) => {

}

exports.getEdit = (req,res) => {

}
// Create
exports.createPost = async (req,res) => {
    const { post } = req.body;
    console.log(post);
    try {
      const newPost = new Post({
        user: req.session.user,
        description: post
      })
      await newPost.save()
      res.redirect('/users/profile/' + req.session.user._id.toString())
    }catch(e) {

    }
}

exports.updatePost = (req,res) => {
    
}

exports.deletePost = (req,res) => {
    
}

exports.getAllPosts = (req,res) => {

}