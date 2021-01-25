const Post = require('../models/Post');

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
      description: description
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
    res.redirect('/users/profile' + req.user._id)
  } catch(e) {
    console.log(e)
  }
}
// Create
exports.createPost = async (req,res) => {
    const { post } = req.body;
    // console.log(post);
    try {
      const newPost = new Post({
        user: req.session.user,
        description: post
      })
      await newPost.save()
      //! =====================
      //TODO redirect to timeline if he in timeline route
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