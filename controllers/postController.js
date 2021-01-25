const Post = require('../models/Post');

const findHashtags = require('find-hashtags');

// /posts/:id/details
exports.getEdit = async (req,res) => {

  const postId = req.params.id;
  // if there's user in the request let userid = the user
  // if there's no user let userid = null
  let userid = req.user._id || null;

  try {
    const post = await Post.findById(postId)
    // console.log(post)
    res.render('post/post-edit', {
      post,
      userid
    })
  } catch(e) {

  }
}

// /posts/:id/edit
exports.postEdit = async (req,res) => {

  const postId = req.params.id;
  const { userid, description } = req.body

  try {
    const editPost = await Post.findByIdAndUpdate(postId, {
      user: userid,
      description: description,
      readingTime: Math.floor(description.split(" ").length / 100) === 0 ? 1 : Math.floor(description.split(" ").length / 100),
      hashtags: findHashtags(description)
    });
    res.redirect('/users/profile/' + userid)
  } catch(e) {
    console.log(e)
  }
}

// /posts/:id
exports.getPostDetail = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId).populate('user');
    // console.log(post)
    res.render('post/post-detail', {
      post
    })
  }catch(e) {

  }
}
// posts/:id/delete
exports.deletePost = async (req, res) => {
  console.log('in deletedPost controller now!!!!!')
  const postId = req.params.id;
  console.log(postId)

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    console.log(deletedPost)
    res.redirect('/users/profile/' + req.user._id)
  } catch(e) {
    console.log(e)
  }
}
// Create
// localhost:3000/posts/create?timeline=true
exports.createPost = async (req,res) => {
    const { post } = req.body;
    console.log(post);
    // TODO find hashtags in post description
    // TODO update the post instance while creating
    // TODO pass the hashtags array to the view
    // TODO for loop through all hashtags for each post
    // extract
    console.log(Math.floor(post.split(" ").length / 100))
    console.log(findHashtags(post))
    try {
      const newPost = new Post({
        user: req.session.user,
        description: post,
        readingTime: Math.floor(post.split(" ").length / 100) === 0 ? 1 : Math.floor(post.split(" ").length / 100),
        hashtags: findHashtags(post)
      })
      await newPost.save()

      if (req.query.timeline) {
        res.redirect('/timeline');
      }

      res.redirect('/users/profile/' + req.session.user._id.toString())
    }catch(e) {

    }
}

exports.updatePost = (req,res) => {
    
}

exports.getAllPosts = (req,res) => {

}