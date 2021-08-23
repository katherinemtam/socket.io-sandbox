const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get username and room from URL
const { username, room } = Qs.parse(location.search, {
  // removes question mark and ampersand 
  ignoreQueryPrefix: true
});

// we have access to this because of the script added in chat.html (line 58)
const socket = io();

// join chatroom
socket.emit('joinRoom', { username, room });

//get room and users
socket.on('roomUsers', ({ room, users}) => {
  outputRoomName(room);
  outputUsers(users);
})

// catches "message" from server.js
socket.on('message', message => {
  console.log(message)
  outputMessage(message);

  // every time we get a message, scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get message text by grabbing input id="msg" value (chat.html, line 51)
  const msg= e.target.elements.msg.value;

  // emit message to the server, so we need to catch in server.js
  socket.emit('chatMessage', msg);

  // clear input
  e.target.elements.msg.value = '';
  // refocuses on input to allow additional values directly following submit
  e.target.elements.msg.focus();
});

// output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>
  `; 
  document.querySelector('.chat-messages').appendChild(div);
};

// add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
    ${users.map(user => `
      <li>${user.username}</li>  
    `).join('')}
  `
}

