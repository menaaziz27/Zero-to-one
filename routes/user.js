// ============ Node-Packages ============
const express = require("express");

// ============ My-Modules ============
const { check, body } = require("express-validator");

const {
	getUpdateProfile,
	postUpdateProfile,
	getUsersProfile,
} = require("../controllers/profileController");

const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/updateProfile", isAuthenticated, getUpdateProfile);

router.post(
	"/profile",
	isAuthenticated,
	[
		body("name", "Please enter a valid name must be at least 4 chars long").isLength({ min: 4 }),
		body("bio", " Bio must be at least 10 chars long").isLength({ min: 10 }),
	],
	postUpdateProfile
);

router.get("/profile/:id", isAuthenticated, getUsersProfile);

module.exports = router;
