const router = require('express').Router();

const {
	createRoadmap,
	getRoadmap,
	getRoadmaps,
} = require('../controllers/roadmapscontroller');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', getRoadmaps);
router.post('/createe', createRoadmap);
router.get('/:roadmap', isAuthenticated, getRoadmap);

module.exports = router;
