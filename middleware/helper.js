const User = require('../models/User');

module.exports = {
	findUser: (req, res, next) => {
		if (!req.session.user) {
			return next();
		}
		User.findById(req.session.user._id)
			.then(user => {
				req.user = user;
				let currentUser = req.user || null;
				let userid = req.user._id.toString() || null;
				// console.log(userid)
				res.locals.currentUser = currentUser;
				res.locals.userid = userid;
				res.locals.isAuthenticated = req.session.isLoggedin;
				res.locals.name = req.session.user.name;
				next();
			})
			.catch(err => {
				console.log(err);
			});
	},
};
