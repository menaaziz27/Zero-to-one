const router = require("express").Router();


const {
	createRoadmap,
  getRoadmap
} = require("../controllers/roadmapscontroller");

router.post("/createe", createRoadmap);
router.get("/:roadmap", getRoadmap)

module.exports = router;
