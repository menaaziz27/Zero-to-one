$(document).ready(() => {
	$.get('/api/notifications', data => {
		outputNotificationList(data, $('.resultsContainer'));
	});
});

function outputNotificationList(notifications, container) {
	notifications.forEach(notification => {
		const html = createNotificationHtml(notification);
		container.append(html);
	});

	if (notifications.length === 0) {
		container.append("<span class='noResults'>Nothing to show.</span>");
	}
}

function createNotificationHtml(notification) {
	let userFrom = notification.userFrom;
	let text = notificationText(notification);
	let url = notificationUrl(notification);

	return `
		<a href='${url}' class='resultListItem notification'>
                <div class='resultsImageContainer'>
                    <img src='${userFrom.Image}'>
                </div>
                <div class='resultsDetailsContainer ellipsis'>
                    <span class='ellipsis'>${text}</span>
                </div>
            </a>
	`;
}

function notificationText(notification) {
	let userFrom = notification.userFrom;
	console.log(userFrom);
	if (!userFrom.name || !userFrom.username) {
		return alert('userFrom is not populated');
	}

	let userFromName = userFrom.name;

	let text;

	if (notification.notificationType === 'postLike') {
		text = `${userFromName} liked one of your posts`;
	} else if (notification.notificationType === 'reply') {
		text = `${userFromName} replied to one of your posts`;
	} else if (notification.notificationType === 'follow') {
		text = `${userFromName} followed you`;
	}

	return `<span class="ellipsis">${text}</span>`;
}

function notificationUrl(notification) {
	let url = '#';

	if (
		notification.notificationType === 'postLike' ||
		notification.notificationType === 'reply'
	) {
		url = `/posts/${notification.entityId}/details`;
	} else if (notification.notificationType === 'follow') {
		url = `/users/profile/${notification.entityId}`;
	}

	return url;
}
