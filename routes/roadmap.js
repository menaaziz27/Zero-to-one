const router = require('express').Router();

const {
	createRoadmap,
	getRoadmap,
	getRoadmaps,
	getDiagram,
} = require('../controllers/roadmapscontroller');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getRoadmaps);
router.post('/createe', createRoadmap);
router.get('/:roadmap', isAuthenticated, getRoadmap);
router.get('/:roadmap/:topic', getDiagram);

module.exports = router;
