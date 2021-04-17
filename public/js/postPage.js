let userId;
$(document).ready(function () {
	$.get('/posts/' + postId, results => {
		let post = results.post;
		console.log(post);
		userId = results.userId;
		outputPosts(post, $('.postContent'));
	});
});
