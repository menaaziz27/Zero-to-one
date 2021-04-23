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
} = require('../controllers/homeController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getHome);
router.get('/timeline', isAuthenticated, getTimeline);
router.get('/news', getNews);
router.get('/search', getSearch);
router.get('/search/posts', getSearchPosts);
router.post('/search/posts', postSearchPosts);
router.post('/search/users', postSearch);

module.exports = router;
