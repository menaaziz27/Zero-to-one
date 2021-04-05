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
	getDiagram,
	getCss,
  getBackDiagram,
  getBioDiagram,
  getDashboard
} = require('../controllers/homeController');

const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getHome);
router.get('/timeline', isAuthenticated, getTimeline);
router.get('/roadmaps', getRoadmaps);
router.get('/news', getNews);
router.get('/search', getSearch);
router.get('/dashboard', getDashboard);
router.get('/search/posts', getSearchPosts);
router.post('/search/posts', postSearchPosts);
router.post('/search/users', postSearch);
router.get('/diagram', isAuthenticated, getDiagram);
router.get('/html', isAuthenticated, getHtml);
router.get('/css', isAuthenticated, getCss);
router.get('/backend', isAuthenticated, getBackDiagram);
router.get('/bioinformatics', isAuthenticated, getBioDiagram);


module.exports = router;
