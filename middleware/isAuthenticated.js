exports.isAuthenticated = (req, res, next) => {
	if (req.session.isLoggedin) {
		return next();
	}
	if (req.query.index) {
		res.redirect(`/auth/Login?index=${req.query.index}`);
	} else {
		res.redirect('/auth/Login');
	}
};
