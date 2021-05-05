exports.getMessages = (req, res) => {
	const payload = {
		pageTitle: 'Inbox Page',
		userLoggedIn: req.session.user,
		userLoggedInJs: JSON.stringify(req.session.user),
	};
	res.render('messages/inboxPage', payload);
};
exports.newMessage = (req, res) => {
	const payload = {
		pageTitle: 'New Message',
		userLoggedIn: req.session.user,
		userLoggedInJs: JSON.stringify(req.session.user),
	};
	res.render('messages/newMessage', payload);
};
