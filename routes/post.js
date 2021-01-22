// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const postController = require('../controllers/postController');

const router = express.Router();


router.get('/allposts', postController.getAllPosts)

// get post by id
router.get('/:id', postController.getPost)

// create new post
router.post('/create', postController.createPost)

// update post
router.put('/:id', postController.updatePost)

// delete post by id 
router.delete('/:id', postController.deletePost);


// get a userprofile
// router.get('/:username')


module.exports = router;
