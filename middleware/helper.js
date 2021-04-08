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
	renderUsers: user =>
		`
		<div class="mb-3 card">
			<div class="row g-0">
				<div class="row">
					<div class="col-md-2">
						<a href="#"> <img
						src="/images/121808452_3657192080969511_4470454584173775372_n.jpg"
						alt="..."> </a>
					</div>
				<div class="col-md-10">
			<div class="btncard card-body">
				<a href="#">
					<h5 class="card-title">
						${user.name}
					</h5>
				</a>
			<div class="social">
			<a href="#"><i class="fab fa-instagram fa-xl"></i> </a>
			<a href="#"><i class="fab fa-facebook fa-xl"></i> </a>
			<a href="#"> <i class="fab fa-twitter-square fa-xl"></i> </a>

			</div>
			<p class="card-text">
			${user.bio ? user.bio : ''}
			</p>
			<hr style="width: 90%; position: absolute; top: 130px; left: 20px;">
			<a href="/users/profile/${user.username}" class="btn">visit</a>
			</div>
			<div class="container-fluid">
			<div class="mt-4 row justify-content-center">
			<div class="col col-md-offset-2 "><span>Country</span>
			<p>
			${user.country}
			</p>
			</div>
			<div class="col col-md-offset-2 "> <span>Gender</span>
			<p>
			${user.gender}
			</p>
			</div>
			<div class="col col-md-offset-2 "><span>year of birth</span>
			<p class="w-100">1999</p>
			</div>
			<div class="col col-md-offset-2 "> <span>Language</span>
			<p>
			${user.nativeLang}
			</p>
			</div>
			</div>
			</div>
			</div>
			</div>
			</div>
		</div>`,
	generateCriteriaObject: obj => {
		let data = {};
		// delete all properties that have values of 'any'
		for (let prop in obj) {
			// if the property is empty string or 'any' or skills array is empty delete them
			if (obj[prop] === 'any' || obj[prop] === '' || obj[prop].length === 0) {
				delete obj[prop];
			}
			// lw el prop = name w el name msh empty 7ott el query bta3t el search f el obj data
			if (prop === 'name' && obj[prop] !== '' && obj[prop] !== undefined) {
				data['$text'] = { $search: `${obj[prop]}` };
			} else if (prop === 'skills' && obj[prop]?.length > 0) {
				if (obj[prop].length === 1) {
					data['skills'] = { $in: `${obj[prop].concat([])}` };
				} else {
					data['skills'] = { $in: obj[prop] };
				}
			} else if (obj[prop] !== undefined) {
				data[prop] = obj[prop];
			}
		}
		return data;
	},
};
