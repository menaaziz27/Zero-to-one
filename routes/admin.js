const router = require('express').Router();

const {
	
  getDashboard,
  getUserDashboard,
  getEditUserDashboard,
  deleteUser,
  postEditUserDashboard,
  getPostDashboard,
  deletePost,
  getEditPostDashboard,
  postEditPostDashboard
} = require('../controllers/adminController');


router.get('/dashboard', getDashboard);
router.get('/dashboard/users', getUserDashboard);
router.get('/dashboard/users/edit/:id', getEditUserDashboard);
router.post('/dashboard/users/delete', deleteUser);
router.post('/dashboard/users/edit', postEditUserDashboard);
router.get('/dashboard/posts', getPostDashboard);
router.post('/dashboard/posts/delete', deletePost);
router.get('/dashboard/posts/edit/:id', getEditPostDashboard);
router.post('/dashboard/posts/edit', postEditPostDashboard);










module.exports = router;
