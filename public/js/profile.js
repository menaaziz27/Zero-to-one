$(document).ready(function () {
	console.log(selectedTap);
	if (selectedTap === 'comments') {
		loadComments();
	} else {
		loadPosts();
	}
});

function loadPosts() {
	$.get(
		`/posts?skip=${skip}&limit=${limit}`,
		{ user: userLoggedIn, isReply: false },
		postsAndUserId => {
			let posts = postsAndUserId.posts;
			userId = postsAndUserId.userId;
			outputPosts(posts, $('.postContent'));
		}
	);
}

function loadComments() {
	$.get(
		`/posts?skip=${skip}&limit=${limit}`,
		{ user: userLoggedIn, isReply: true },
		postsAndUserId => {
			let posts = postsAndUserId.posts;
			userId = postsAndUserId.userId;
			outputPosts(posts, $('.postContent'));
		}
	);
}

window.onscroll = () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
		selectedTap === 'comments' ? loadComments() : loadPosts();
	}
};
