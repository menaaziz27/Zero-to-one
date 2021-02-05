// ============ Node-Packages ============
const router = require("express").Router();

// ============ My-Modules ============
const {
	getHome,
	getRoadmaps,
	getNews,
	getTimeline,
	getSearch,
	postSearch,
} = require("../controllers/homeController");

const { isAuthenticated } = require("../middleware/isAuthenticated");

router.get("/", getHome);
router.get("/timeline", isAuthenticated, getTimeline);
router.get("/roadmaps", getRoadmaps);
router.get("/news", getNews);
router.get("/search", getSearch);
router.post("/search/users", postSearch);

module.exports = router;
