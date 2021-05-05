$(document).ready(function () {
	console.log(selectedTap);
	if (selectedTap === 'comments') {
		loadComments();
	} else {
		loadPosts();
	}
});

function loadPosts() {
	// this object is being received in the req.query;
	$.get('/posts', { user: userLoggedIn, isReply: false }, postsAndUserId => {
		let posts = postsAndUserId.posts;
		userId = postsAndUserId.userId;
		outputPosts(posts, $('.postContent'));
	});
}

function loadComments() {
	// this object is being received in the req.query;
	$.get('/posts', { user: userLoggedIn, isReply: true }, postsAndUserId => {
		let posts = postsAndUserId.posts;
		userId = postsAndUserId.userId;
		outputPosts(posts, $('.postContent'));
	});
}
