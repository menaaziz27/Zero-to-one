$(document).ready(() => {
	$.get(`/chats/${chatId}`, (data) => 
  {if(data.users.length == 1){alert('other user is not available now')} 
  $('#chatName').text(getChatName(data))});

  $.get(`/chats/${chatId}/messages`,(data) => {
    var messages = [];

    data.forEach((message, index) => {
        var html = createMessageHtml(message);
        messages.push(html);

    })
    var messagesHtml = messages.join("");
    addMessagesHtmlToPage(messagesHtml);
})
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

$(".sendMessageButton").click(() => {
  messageSubmitted();
})
$(".inputTextbox").keydown((event) => {

  if(event.which === 13) {
      messageSubmitted();
      return false;
  }
})

function messageSubmitted() {
  var content = $(".inputTextbox").val().trim();

  if(content != "") {
      sendMessage(content);
      $(".inputTextbox").val("");
  }
}
function sendMessage(content) {
  $.post("/chatMessage", { content: content, chatId: chatId }, (data, status, xhr) => {
    if(xhr.status != 201) {
      alert("Could not send message");
      $(".inputTextbox").val(content);
      return;
  }
    addChatMessageHtml(data)
    })
}
function addMessagesHtmlToPage(html) {
  $(".chatMessages").append(html);
}
function addChatMessageHtml(message) {
  if(!message || !message._id) {
      alert("Message is not valid");
      return;
  }

  var messageDiv = createMessageHtml(message);

    addMessagesHtmlToPage(messageDiv);

}
function createMessageHtml(message) {

  

  var isMine = message.sender._id == userLoggedIn._id;
  var liClassName = isMine ? "mine" : "theirs";

  return `<li class='message ${liClassName}'>
              <div class='messageContainer'>
                  <span class='messageBody'>
                      ${message.content}
                  </span>
              </div>
          </li>`;
}
