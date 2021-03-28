const router = require("express").Router();


const {
	createRoadmap
} = require("../controllers/roadmapscontroller");

router.post("/createe", createRoadmap);


module.exports = router;
