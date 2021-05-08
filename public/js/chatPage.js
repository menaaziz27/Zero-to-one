$(document).ready(() => {
	$.get(`/chats/${chatId}`, (data) => {if(data.users.length == 1){alert('other user is not available now')} $('#chatName').text(getChatName(data))});
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
             console.log(data)
    })
}