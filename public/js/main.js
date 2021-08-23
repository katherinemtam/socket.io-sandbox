const chatForm = document.getElementById('chat-form');

// we have access to this because of the script added in chat.html (line 58)
const socket = io();

// catches "message" from server.js
socket.on('message', message => {
  console.log(message)
  outputMessage(message);
})

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get message text by grabbing input id="msg" value (chat.html, line 51)
  const msg= e.target.elements.msg.value;

  // emit message to the server, so we need to catch in server.js
  socket.emit('chatMessage', msg);
});

// output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
    <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
      ${message}
    </p>
  `; 
  document.querySelector('.chat-messages').appendChild(div);
}
