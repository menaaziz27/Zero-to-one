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
  postEditPostDashboard,
  getRoadmapDashboard,
  getCreateRoadmapDashboard,
  postCreateRoadmapDashboard,
  deleteRoadmap,
  getTopicDashboard,
  getCreateTopicDashboard,
  postCreateTopicDashboard,
  deleteTopic,
  getEditTopicDashboard,
  postEditTopicDashboard
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
router.get('/dashboard/roadmaps', getRoadmapDashboard);
router.get('/dashboard/roadmaps/create', getCreateRoadmapDashboard);
router.post('/dashboard/roadmaps/create', postCreateRoadmapDashboard);
router.post('/dashboard/roadmaps/delete', deleteRoadmap);
router.get('/dashboard/topics', getTopicDashboard);
router.get('/dashboard/topics/create',getCreateTopicDashboard );
router.post('/dashboard/topics/create', postCreateTopicDashboard);
router.post('/dashboard/topics/delete', deleteTopic);
router.get('/dashboard/topics/edit/:id', getEditTopicDashboard);
router.post('/dashboard/topics/edit', postEditTopicDashboard);



















module.exports = router;
