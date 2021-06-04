// ============ Node-Packages ============
const router = require('express').Router();

const {
	getHome,
	getRoadmaps,
	getNews,
	getTimeline,
	getSearch,
	getSearchPosts,
	postSearchPosts,
	postSearch,
	getHtml,
	getCss,
	explore,
  postFeedback
} = require('../controllers/homeController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getHome);
router.get('/timeline', isAuthenticated, getTimeline);
router.get('/explore', isAuthenticated, explore);
router.get('/news', isAuthenticated, getNews);
router.get('/search', isAuthenticated, getSearch);
router.get('/search/posts', isAuthenticated, getSearchPosts);
router.post('/search/posts', isAuthenticated, postSearchPosts);
router.post('/search/users', isAuthenticated, postSearch);
router.post('/feedback',postFeedback );


module.exports = router;
