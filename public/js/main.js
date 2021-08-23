const chatForm = document.getElementById('chat-form');

// we have access to this because of the script added in chat.html (line 58)
const socket = io();

// catches "message" from server.js
socket.on('message', message => {
  console.log(message)
})

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get message text by grabbing input id="msg" value (chat.html, line 51)
  const msg= e.target.elements.msg.value;

  // emit message to the server, so we need to catch in server.js
  socket.emit('chatMessage', msg);
});
