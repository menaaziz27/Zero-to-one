// ============ Node-Packages ============
const router = require('express').Router();

// ============ My-Modules ============
const {
	getEdit,
	getPostDetail,
	createPost,
	postEdit,
	deletePost,
	getPosts,
	postLike,
} = require('../controllers/postController');

router.get('/:id', getPostDetail);
router.put('/:id/like', postLike);
router.get('/:id/edit', getEdit);
router.post('/:id/edit', postEdit);
router.post('/:id/delete', deletePost);
router.post('/', createPost);
router.get('/', getPosts);

module.exports = router;
