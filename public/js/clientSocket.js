let connected = false;

let socket = io('http://localhost:3000');
console.log(userLoggedIn);
socket.emit('setup', userLoggedIn);
socket.on('connected', () => (connected = true));
socket.on('message received', newMessage => messageReceived(newMessage));

socket.on('notification received', newNotification => {
	$.get('/api/notifications/latest', notificationData => {
		refreshNotificationBadge();
	});
});

function emitNotification(userId) {
	console.log('user id => ', userId);
	console.log('userLoggedIn => ', userLoggedIn._id);
	if (userId.toString() === userLoggedIn._id.toString()) {
		console.log('user id equal userloggedin id');
		return;
	} else {
		console.log('emit notification');
		socket.emit('notification received', userId);
	}
}
