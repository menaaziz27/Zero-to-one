// ============ Node-Packages ============
const router = require('express').Router();

// ============ My-Modules ============
const {
	getEdit,
	getPostDetail,
	createPost,
	postEdit,
	deletePost,
} = require('../controllers/postController');

// get post detail
router.get('/:id', getPostDetail);

// get post by id
router.get('/:id/edit', getEdit);

// update post
router.post('/:id/edit', postEdit);

// delete post by id
router.post('/:id/delete', deletePost);

// create new post
router.post('/create', createPost);

module.exports = router;
