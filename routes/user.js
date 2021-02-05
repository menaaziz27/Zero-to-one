// ============ Node-Packages ============
const router = require("express").Router();

// ============ My-Modules ============
const {
	getUpdateProfile,
	postUpdateProfile,
	getUsersProfile,
	validateProfile
} = require("../controllers/profileController");

const { isAuthenticated } = require("../middleware/isAuthenticated");

router.get("/updateProfile", isAuthenticated, getUpdateProfile);

router.post(
	"/profile",
	isAuthenticated,
	validateProfile,
	postUpdateProfile
);

router.get("/profile/:id", isAuthenticated, getUsersProfile);

module.exports = router;
