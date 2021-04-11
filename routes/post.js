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

router.get('/:id', getPostDetail);
router.get('/:id/edit', getEdit);
router.post('/:id/edit', postEdit);
router.post('/:id/delete', deletePost);
router.post('/create', createPost);

module.exports = router;
