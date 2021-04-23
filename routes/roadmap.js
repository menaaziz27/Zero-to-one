const router = require('express').Router();

const {
	createRoadmap,
	getRoadmap,
	getRoadmaps,
   gettopic
} = require('../controllers/roadmapscontroller');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getRoadmaps);
router.post('/createe', createRoadmap);
router.get('/:roadmap', isAuthenticated, getRoadmap);
router.get('/roadmap/:topic', gettopic);


module.exports = router;
