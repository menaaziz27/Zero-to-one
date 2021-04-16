let userId;
$(document).ready(function () {
	$.get('/posts', postsAndUserId => {
		let posts = postsAndUserId.posts;
		userId = postsAndUserId.userId;
		outputPosts(posts, $('.postContent'));
	});
});
