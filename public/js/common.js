$('#post').keyup(e => {
	var textbox = $(e.target);
	var value = textbox.val().trim();
	var submitPostButton = $('#submitPostButton');

	if (submitPostButton.length == 0) return alert('no submit button found');

	if (value == '') {
		submitPostButton.prop('disabled', true);
		return;
	}

	submitPostButton.prop('disabled', false);
});
$('#submitPostButton').click(e => {
	var button = $(e.target);
	var textbox = $('#post');

	var data = {
		post: textbox.val(),
	};

	$.post('/posts', data, allData => {
		userId = allData.userId;
		let postData = allData.newPost;
		const html = createPostHtml(postData, userId);
		$('.postContent').prepend(html);
		textbox.val('');
		button.prop('disabled', true);
	});
});

function createPostHtml(post, userId) {
	let hashtagsHtml;

	let isActive = post.likes.includes(userId) ? 'active' : '';
	if (post.hashtags) {
		hashtagsHtml = post.hashtags
			.map(hashtag => {
				return `
                                <a href="" class="crayons-tag"><span
                                                        class="crayons-tag__prefix">#</span>
                                                    ${hashtag}
                                                </a>
                            `;
			})
			.join('');
	}

	return `
        <div class="crayons-story post" data-id=${post._id}>
                <a href="aemiej/use-github-real-time-status-to-improve-your-profile-554m.html"
                    aria-labelledby="article-link-421966"
                    class="crayons-story__hidden-navigation-link">Use
                    Github Real-Time Status to Improve Your Profile</a>
                <div class="crayons-story__body">
                    <div class="crayons-story__top">
                        <div class="crayons-story__meta">
                            <div class="crayons-story__author-pic">
                                <a href="users/profile/${post.user.username}"
                                    class="crayons-avatar crayons-avatar--l ">
                                    <img src="/${
																			post.user.Image
																		}" alt="aemiej profile"
                                    class="crayons-avatar__image" />
                                </a>
                            </div>
                            <div>
                                <p>
                                    <a href="users/profile/${
																			post.user.username
																		}"
                                        class="crayons-story__secondary fw-medium">
                                        ${post.user.name}
                                    </a>
                                </p>
                                <a href="/posts/${post._id}?timeline=true"
                                    class="crayons-story__tertiary fs-xs"><time
                                        datetime="2020-08-08T06:46:08Z">
                                        ${moment(post.createdAt).fromNow()}
                                    </time><span class="time-ago-indicator-initial-placeholder"
                                        data-seconds="1596869168"></span></a>
                            </div>
                        </div>
                    </div>
                    <div class="crayons-story__indention">
                        <h2 class="crayons-story__title">
                            <p>
                                ${post.description}
                            </p>
                        </h2>
                        <div class="crayons-story__tags">
                            ${post.hashtags ? hashtagsHtml : ''}
                        </div>
                        <div class="crayons-story__bottom">
                            <div class="crayons-story__details">
                                <div class="postButtonContainer red">
                                    <button 
                                        class="crayons-btn crayons-btn--s crayons-btn--ghost crayons-btn--icon-left likeButton ${isActive}"
                                        data-reaction-count data-reactable-id="421966">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            role="img" aria-labelledby="al1d5uvy9oyhvuvdwqy2p05movla8vol"
                                            class="crayons-icon">
                                            <title id="al1d5uvy9oyhvuvdwqy2p05movla8vol">Reactions
                                            </title>
                                            <path
                                                d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z">
                                            </path>
                                        </svg>
                                        
                                        <span class="">${
																					post.likes.length || ''
																				}</span>
                                    </button>
                                </div>
                                <div class="postButtonContainer green">
                                    <button href=""
                                        class="crayons-btn crayons-btn--s crayons-btn--ghost crayons-btn--icon-left anchor">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            role="img" aria-labelledby="ad9em4d60sxys3w6ddrpoouqjxuw2d4y"
                                            class="crayons-icon">
                                            <title id="ad9em4d60sxys3w6ddrpoouqjxuw2d4y">Comments
                                            </title>
                                            <path
                                                d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                                            </path>
                                        </svg>

                                        1
                                        <span class="hidden s:inline">&nbsp;comments</span>
                                    </button>
                                </div>
                            </div>
                            <div class="crayons-story__save">
                                <small class="mr-2 crayons-story__tertiary fs-xs">
                                </small>
                                ${
																	userId == post.user._id
																		? `<a type="button" href="/posts/${post._id}/edit?timeline=true"
                                        id="article-save-button-421966"
                                        class="crayons-btn crayons-btn--secondary crayons-btn--s bookmark-button"
                                        data-reactable-id="421966" aria-label="Save to reading list"
                                        title="Save to reading list">
                                        <span class="bm-initial">edit</span>
                                    </a>`
																		: ''
																}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    `;
}

$(document).on('click', '.likeButton', function (e) {
	var button = $(e.target);
	var postId = getPostIdFromElement(button);

	if (postId === undefined) return;
	$.ajax({
		url: `/posts/${postId}/like`,
		type: 'PUT',
		success: postData => {
			console.log(userLoggedIn);
			button.find('span').text(postData.likes.length || '');
			if (postData.likes.includes(userLoggedIn._id)) {
				button.addClass('active');
			} else {
				button.removeClass('active');
			}
		},
	});
});

function getPostIdFromElement(element) {
	var isRoot = element.hasClass('post');
	var rootElement = isRoot ? element : element.closest('.post');
	var postId = rootElement.data().id;
	if (postId === undefined) return alert('Post id undefined');
	return postId;
}
