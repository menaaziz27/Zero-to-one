let userId;
$(document).ready(function () {
	$.get('/posts', postsAndUserId => {
		let posts = postsAndUserId.posts;
		userId = postsAndUserId.userId;
		console.log(posts);
		outputPosts(posts, $('.postContent'));
	});
});

function outputPosts(posts, container) {
	container.html('');
	posts.forEach(post => {
		var html = createPostHtml(post, userId);
		container.append(html);
	});

	if (posts.length == 0) {
		container.append("<span class='noResults'>Nothing to show.</span>");
	}
}
