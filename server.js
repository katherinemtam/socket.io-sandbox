const path = require('path');
// http used by express under the hood
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// run when client connects
io.on('connection', socket => {
  // we catch this on the client side via main.js
  // socket.emit will emit to the single user/client that is connecting
  socket.emit('message', 'Welcome to ChatCord!');

  // broadcast when a user connects
  // socket.broadcast.emit will emit to everyone except the user that is connecting
  socket.broadcast.emit('message', 'A user has joined the chat');

  //Runs when client disconnects
  socket.on('disconnect', () => {
    // io.emit will emit to everyone
    io.emit('message', 'A user has left the chat');
  });
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
