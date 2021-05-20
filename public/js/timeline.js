let userId;
$(document).ready(function () {
	function load() {
		// put them in load function
		$.get(`/posts?skip=${skip}&limit=${limit}`, postsAndUserId => {
			let posts = postsAndUserId.posts;
			userId = postsAndUserId.userId;
			// call output posts with the incoming 20 post only
			outputPosts(posts, $('.postContent'));
			skip = skip + limit;
		});
	}
	load();

	// If scrolled to bottom, load the next 10 posts
	window.onscroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			load();
		}
	};
});
