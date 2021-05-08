$(document).ready(() => {
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

	let isFirst = lastSenderId !== currentSenderId;
	let isLast = nextSenderId !== currentSenderId;
	console.log(isFirst);
	console.log(isLast);
	let isMine = message.sender._id === userLoggedIn._id;
	let liClassName = isMine ? 'mine' : 'theirs';

	let nameElement = '';
	if (isFirst) {
		liClassName += ' first';

		if (!isMine) {
			nameElement = `<span class="senderName">${senderName}</span>`;
		}
	}

	if (isLast) {
		liClassName += ' last';
	}

	return `<li class='message ${liClassName}'>
              <div class='messageContainer'>
							${senderName}
                  <span class='messageBody'>
                      ${message.content}
                  </span>
              </div>
          </li>`;
}
