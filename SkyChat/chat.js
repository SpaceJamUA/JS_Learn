const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;
server.listen(port);
app.use(express.static(__dirname));

io.on('connection', function(socket) {
  let name;
  socket.on('newUser',function(nickName){
    name = nickName;
    socket.broadcast.emit('joinNewUser', name);
  })
  socket.on('message', function(msg) {
    io.sockets.emit('messageToClients', msg);
  });
});
