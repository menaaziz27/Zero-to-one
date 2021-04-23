exports.isAuthenticated = (req, res, next) => {
	if (req.session.isLoggedin) {
		return next();
	}
	if (req.query.redirectTo) {
		console.log(req.query.redirectTo, 'in isAuthenticated');
		res.redirect(`/auth/login?redirectTo=${req.query.redirectTo}`);
	} else {
		res.redirect('/auth/login');
	}
};


exports.isAdmin = (req, res, next) => {
	if (req.session.isAdmin) {
		return next();
	}
  else {
		res.redirect('/404');
	}
}