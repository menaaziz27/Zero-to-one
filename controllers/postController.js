const Post = require('../models/Post');

const findHashtags = require('find-hashtags');

// /posts/:id/details
exports.getEdit = async (req,res) => {

  // if there's timeline query in the request let timeline = true else False
  let timeline = req.query.timeline || false
  const postId = req.params.id;
  let userid = req.user._id || null;
  try {
    const post = await Post.findById(postId)
    res.render('post/post-edit', {
      post,
      userid,
      timeline
    })
  } catch(e) {

  }
}

// /posts/:id/edit
exports.postEdit = async (req,res) => {
 
  const postId = req.params.id;
  const { userid, description } = req.body

  try {
    await Post.findByIdAndUpdate(postId, {
      user: userid,
      description: description,
      readingTime: Math.floor(description.split(" ").length / 100) === 0 ? 1 : Math.floor(description.split(" ").length / 100),
      hashtags: findHashtags(description)
    });
    // await editPost.save()
    // console.log(req.query.timeline,'39')
    if (req.query.timeline) {
      res.redirect('/timeline');
    }else{
      res.redirect('/users/profile/' + req.session.user._id.toString())
    }
  } catch(e) {
    console.log(e)
  }
}

// /posts/:id
exports.getPostDetail = async (req, res) => {
  let timeline = req.query.timeline || false
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId).populate('user');
    res.render('post/post-detail', {
      post,
      timeline
    })
  }catch(e) {

  }
}
// posts/:id/delete
exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await Post.findByIdAndDelete(postId);
    if (req.query.timeline) {
      res.redirect('/timeline');
    }else{
      res.redirect('/users/profile/' + req.session.user._id.toString())
    }
  } catch(e) {
    console.log(e)
  }
}


// Create
// localhost:3000/posts/create?timeline=true
exports.createPost = async (req,res) => {

    const { post } = req.body;

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
      }else{
        res.redirect('/users/profile/' + req.session.user._id.toString())
      }

    }catch(e) {
      console.log(e)
    }
}
