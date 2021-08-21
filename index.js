const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
//initialize new instance of socket.io with HTTP server
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//listen for incoming sockets
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('chat message', (msg) => {
    //io.emit sends the event to all connected sockets, including the sender
    //socket.broadcast.emit('hi') to emit to everyone except a certain socket
    io.emit('chat message', msg);
  });
  //when user disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
