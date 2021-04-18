$('#post, #reply').keyup(e => {
	var textbox = $(e.target);
	var value = textbox.val().trim();

	// check if the event fires in the modal or not .. law f el modal hn5alli el disabled 3la el reply
	let isModal = textbox.parents('.modal').length == 1;

	var submitPostButton = isModal
		? $('#submitReplyButton')
		: $('#submitPostButton');

	if (submitPostButton.length == 0) return alert('no submit button found');

	if (value == '') {
		submitPostButton.prop('disabled', true);
		return;
	}

	submitPostButton.prop('disabled', false);
});

$('#replyModal').on('show.bs.modal', e => {
	var button = $(e.relatedTarget);
	var postId = getPostIdFromElement(button);
	$('#submitReplyButton').data('id', postId);

	$.get(`/posts/${postId}`, postsAndUserId => {
		console.log(postsAndUserId);
		let post = postsAndUserId.post;
		userId = postsAndUserId.userId;
		console.log(post);
		outputPosts(post, $('#originalPostContainer'));
	});
});

$('#replyModal').on('hidden.bs.modal', e => {
	$('#originalPostContainer').html('');
});

$('#deletePostModal').on('show.bs.modal', e => {
	var button = $(e.relatedTarget);
	var postId = getPostIdFromElement(button);
	$('#deletePostButton').data('id', postId);
});

$('#deletePostButton').click(e => {
	let postId = $(e.target).data('id');

	$.ajax({
		url: `/posts/${postId}`,
		type: 'DELETE',
		success: postData => {
			location.reload();
		},
	});
});

$('#submitPostButton, #submitReplyButton').click(e => {
	var button = $(e.target);

	let isModal = button.parents('.modal').length == 1;

	var textbox = isModal ? $('#reply') : $('#post');

	var data = {
		post: textbox.val(),
	};

	if (isModal) {
		console.log(true, 'modal');
		let id = button.data().id;
		if (id === null) return alert('button id is null');
		data.replyTo = id;
	}
	console.log(data);

	$.post('/posts', data, allData => {
		userId = allData.userId;
		let postData = allData.newPost;

		if (postData.replyTo) {
			location.reload();
		} else {
			const html = createPostHtml(postData, userId);
			$('.postContent').prepend(html);
			textbox.val('');
			button.prop('disabled', true);
		}
	});
});

function createPostHtml(post, userId) {
	let hashtagsHtml;

	var timestamp = timeDifference(new Date(), new Date(post.createdAt));

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
	var replyFlag = '';
	if (post.replyTo && post.replyTo._id) {
		if (!post.replyTo._id) {
			return alert('Reply to is not populated');
		} else if (!post.replyTo.user._id) {
			return alert('Posted by is not populated');
		}

		var replyToUsername = post.replyTo.user.username;
		replyFlag = `<div class='replyFlag'>
                        Replying to <a href='/users/profile/${replyToUsername}'>@${replyToUsername}<a>
                    </div>`;
	}

	let buttons = '';
	if (post.user._id === userId) {
		buttons = `<button data-id="${post._id}" data-toggle="modal" data-target="#deletePostModal"><i class='fas fa-times'></i></button>`;
	}

	return `
        <div class="crayons-story post" data-id=${post._id}>
										${buttons}
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
														<img src="/${post.user.Image}" alt="aemiej profile"
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
                                <a href="/posts/${
																	post._id
																}/details?timeline=true"
                                    class="crayons-story__tertiary fs-xs"><time
                                        datetime="2020-08-08T06:46:08Z">
                                        ${timestamp}
                                    </time><span class="time-ago-indicator-initial-placeholder"
                                        data-seconds="1596869168"></span></a>
																				
                            </div>
                        </div>
                    </div>
										${replyFlag}
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
                                    <button data-toggle="modal" data-target="#replyModal"
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

$(document).on('click', '.post', function (e) {
	let element = $(e.target);
	let postId = getPostIdFromElement(element);

	if (postId !== undefined && !element.is('button')) {
		window.location.href = `/posts/${postId}/details`;
	}
});

function getPostIdFromElement(element) {
	var isRoot = element.hasClass('post');
	var rootElement = isRoot ? element : element.closest('.post');
	var postId = rootElement.data().id;
	if (postId === undefined) return alert('Post id undefined');
	return postId;
}

function outputPostsWithReplies(results, container) {
	console.log('results.post', results);
	container.html('');

	if (results.replyTo !== undefined && results.replyTo._id !== undefined) {
		var html = createPostHtml(results.replyTo);
		container.append(html);
	}
	// ! createposthtml was taking post and true boolean value idk why
	var mainPostHtml = createPostHtml(results.post, userLoggedIn._id);
	container.append(mainPostHtml);

	results.replies.forEach(result => {
		var html = createPostHtml(result);
		container.append(html);
	});
}

function outputPosts(posts, container) {
	container.html('');

	if (!Array.isArray(posts)) {
		posts = [posts];
	}
	posts.forEach(post => {
		var html = createPostHtml(post, userId);
		container.append(html);
	});

	if (posts.length == 0) {
		container.append("<span class='noResults'>Nothing to show.</span>");
	}
}

function timeDifference(current, previous) {
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current - previous;

	if (elapsed < msPerMinute) {
		if (elapsed / 1000 < 30) return 'Just now';

		return Math.round(elapsed / 1000) + ' seconds ago';
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + ' minutes ago';
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + ' hours ago';
	} else if (elapsed < msPerMonth) {
		return Math.round(elapsed / msPerDay) + ' days ago';
	} else if (elapsed < msPerYear) {
		return Math.round(elapsed / msPerMonth) + ' months ago';
	} else {
		return Math.round(elapsed / msPerYear) + ' years ago';
	}
}