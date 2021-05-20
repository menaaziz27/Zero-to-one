let userId;
$(document).ready(function () {
	function load() {
		// put them in load function
		$.get(`/posts?skip=${skip}&limit=${limit}`, postsAndUserId => {
			let posts = postsAndUserId.posts;
			userId = postsAndUserId.userId;
			outputPosts(posts, $('.postContent'));
			skip = skip + limit;
		});
	}
	load();

	window.onscroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			load();
		}
	};
});
