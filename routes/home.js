// ============ Node-Packages ============
const router = require('express').Router();

const {
	getHome,
	getRoadmaps,
	getNews,
	getTimeline,
	getSearch,
	postSearch,
	getHtml,
	getDiagram,
	getCss,
  getBackDiagram,
} = require('../controllers/homeController');

const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getHome);
router.get('/timeline', isAuthenticated, getTimeline);
router.get('/roadmaps', getRoadmaps);
router.get('/news', getNews);
router.get('/search', getSearch);
router.post('/search/users', postSearch);
router.get('/diagram', isAuthenticated, getDiagram);
router.get('/html', isAuthenticated, getHtml);
router.get('/css', isAuthenticated, getCss);
router.get('/backend', isAuthenticated, getBackDiagram);


module.exports = router;
