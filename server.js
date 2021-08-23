const path = require('path');
// http used by express under the hood
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

// run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // welcome current user
      // we catch this on the client side from main.js
      // socket.emit will emit to the single user/client that is connecting
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // broadcast when a user connects
      // socket.broadcast.emit will emit to everyone except the user that is connecting
      // to(user.room) emits message to specific room
    socket.broadcast
      .to(user.room)
      .emit(
        'message', 
        formatMessage(botName, `${user.username} has joined the chat`));
    })

    // listen for chatMessage and emit to everybody
    socket.on('chatMessage', msg => {
      // calls "message" in main.js (line 7)
      io.emit('message', formatMessage('USER', msg));
  });

  // runs when client disconnects
  socket.on('disconnect', () => {
    // io.emit will emit to everyone
    io.emit('message', formatMessage(botName, 'A user has left the chat'));
  });
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
