let userId;
$(document).ready(function () {
	$.get('/posts/' + postId, results => {
		let post = results.post;
		userId = results.userId;
		outputPostsWithReplies(results, $('.postContent'));
	});
});