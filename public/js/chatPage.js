$(document).ready(() => {
	$('.inputTextbox').focus();
	$.get(`/chats/${chatId}`, data => {
		if (data.users.length == 1) {
			alert('other user is not available now');
		}
		$('#chatName').text(getChatName(data));
	});

	$.get(`/chats/${chatId}/messages`, data => {
		var messages = [];
		let lastSenderId = '';

		data.forEach((message, index) => {
			var html = createMessageHtml(message, data[index + 1], lastSenderId);
			messages.push(html);

			lastSenderId = message.sender._id;
		});
		var messagesHtml = messages.join('');
		addMessagesHtmlToPage(messagesHtml);
	});
});

$('#chatNameButton').click(() => {
	let chatName = $('#chatNameTextbox').val().trim();

	$.ajax({
		url: '/chats/' + chatId,
		method: 'PUT',
		data: { chatName },
		success: (data, status, xhr) => {
			if (xhr.status !== 204) {
				alert('couldnt update name');
			} else {
				location.reload();
			}
		},
	});
});

$('.sendMessageButton').click(() => {
	messageSubmitted();
});
$('.inputTextbox').keydown(event => {
	if (event.which === 13) {
		messageSubmitted();
		return false;
	}
});

function messageSubmitted() {
	var content = $('.inputTextbox').val().trim();

	if (content != '') {
		sendMessage(content);
		$('.inputTextbox').val('');
		$('.inputTextbox').focus();
	}
}

function sendMessage(content) {
	$.post(
		'/chatMessage',
		{ content: content, chatId: chatId },
		(data, status, xhr) => {
			if (xhr.status != 201) {
				alert('Could not send message');
				$('.inputTextbox').val(content);
				return;
			}
			addChatMessageHtml(data);
		}
	);
}

function addMessagesHtmlToPage(html) {
	$('.chatMessages').append(html);
}

function addChatMessageHtml(message) {
	if (!message || !message._id) {
		alert('Message is not valid');
		return;
	}

	var messageDiv = createMessageHtml(message, null, '');

	addMessagesHtmlToPage(messageDiv);
}

function createMessageHtml(message, nextMessage, lastSenderId) {
	console.log(message);
	let sender = message.sender;
	let senderName = sender.name;
	console.log(sender, 'sender');
	let currentSenderId = sender._id;
	let nextSenderId = nextMessage !== null ? nextMessage?.sender._id : '';

	console.log(`lastSenderId: ${lastSenderId}`);
	console.log(`currentSenderId: ${currentSenderId}`);
	let isFirst = lastSenderId !== currentSenderId;
	let isLast = nextSenderId !== currentSenderId;
	console.log(`isFirst : ${isFirst}`);
	console.log(`isLast: ${isLast}`);
	console.log(`message.sender._id: ${message.sender._id}`);
	console.log(`userLoggedIn._id: ${userLoggedIn._id}`);
	let isMine = message.sender._id === userLoggedIn._id;
	console.log(`isMine: ${isMine}`);
	let liClassName = isMine ? 'mine' : 'theirs';

	let nameElement = '';
	if (isFirst) {
		liClassName += ' first';

		if (!isMine) {
			nameElement = `<span class="senderName">${senderName}</span>`;
		}
	}

	let profileImage = '';
	if (isLast) {
		liClassName += ' last';
		profileImage = `<img src=/${sender.Image} />`;
	}

	let imageContainer = '';
	if (!isMine) {
		imageContainer = `<div class="imageContainer">
													${profileImage}
											</div>`;
	}

	return `<li class='message ${liClassName}'>
							${imageContainer}
              <div class='messageContainer'>
							${nameElement}
                  <span class='messageBody'>
                      ${message.content}
                  </span>
              </div>
          </li>`;
}
