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

// update post

// delete post by id 
router.delete('/:id', deletePost);

router.get('/:id/edit', getEdit)

router.post('/:id/edit', updatePost)
// create new post
router.post('/create', createPost)



// get a userprofile
// router.get('/:username')


module.exports = router;
