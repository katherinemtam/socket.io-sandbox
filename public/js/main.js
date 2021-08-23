// we have access to this because of the script added in chat.html (line 58)
const socket = io();

// catches "message" from server.js
socket.on('message', message => {
  console.log(message)
})
