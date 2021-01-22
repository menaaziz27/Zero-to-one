// ============ Node-Packages ============ 
const express = require('express');

// ============ My-Modules ============ 
const {
    getAllPosts,
    getPost,
    getEdit,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

const router = express.Router();


router.get('/allposts', getAllPosts)

// get post by id
router.get('/:id', getPost)

router.get('/:id/edit', getEdit)

// create new post
router.post('/create', createPost)

// update post
router.put('/:id', updatePost)

// delete post by id 
router.delete('/:id', deletePost);


// get a userprofile
// router.get('/:username')


module.exports = router;
