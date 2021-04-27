$(document).ready(function() {
    if (selectedTap === 'followers') {
        loadFollowers();
    } else {
        console.log('else');
        loadFollowing();
    }
});

function loadFollowers() {
    // this object is being received in the req.query;
    $.get(`/users/${userLoggedIn._id}/followersdata`, results => {
        outputUsers(results.followers, $('.resultsContainer'));
    });
}

function loadFollowing() {
    // this object is being received in the req.query;
    $.get(`/users/${userLoggedIn._id}/followingdata`, results => {
        outputUsers(results.following, $('.resultsContainer'));
    });
}

function outputUsers(results, container) {
    container.html('');

    results.forEach(follower => {
        const html = createUserHtml(follower, true);
        container.append(html);
    });

    if (results.length === 0) {
        container.append(`<span class="noResults">No results found</span>`);
    }
}

function createUserHtml(userData, showFollowButton) {
    const isFollowing =
        userLoggedIn.following && userLoggedIn.following.includes(userData._id);
    const text = isFollowing ? 'following' : 'follow';
    const buttonClass = isFollowing ? 'followButton following' : 'followButton';

    var followButton = '';
    if (showFollowButton && userLoggedIn._id != userData._id) {
        followButton = `<div class='followButtonContainer'>
                            <button class='${buttonClass}' data-user='${userData._id}'>${text}</button>
                        </div>`;
    }

    return `<div class='user'>
                <div class='userImageContainer'>
                    <img src='/${userData.Image}'>
                </div>
                <div class='userDetailsContainer'>
                    <div class='header'>
                        <a href='/users/profile/${userData.username}'>${userData.name}</a>
                        <span class='username' style="color:blue">@${userData.username}</span>
                    </div>
                </div>
               ${followButton}
            </div>`;
}