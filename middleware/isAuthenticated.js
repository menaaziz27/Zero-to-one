exports.isAuthenticated = (req, res, next) => {
	if (req.session.isLoggedin) {
		return next();
	}

	res.redirect("/auth/Login");
};
