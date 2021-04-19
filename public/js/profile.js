$(document).ready(function() {
    loadPosts();
});

function loadPosts() {
    // this object is being received in the req.query;
    $.get('/posts', { user: userLoggedIn, isReply: false }, postsAndUserId => {
        let posts = postsAndUserId.posts;
        userId = postsAndUserId.userId;
        outputPosts(posts, $('.postContent'));
    });
}