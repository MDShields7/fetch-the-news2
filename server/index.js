const express = require('express');
const app = express();
const server = require('http').createServer(app)
const bodyParser = require('body-parser');
const io = require('socket.io')(server)

var host = '';
var room = 'hi';
var userList = [];
var roomList = [];
let counter = 0;

io.sockets.on('connection', (socket) => {
  socket.emit('welcome', {host:host, roomList:roomList})
  console.log(`user connected, ${socket['id']}`)
  socket.on('join user', (join) => {
    //Adding items to socket object for easy ID on disconnect
    socket.join.id = counter;
    socket.join.user = join.user;
    console.log('user', join.user, 'enters room', join.room, 'id', socket.join.id);
    if (join.user) {
      let newUser = { 
        id: counter,
        host: null,
        user: join.user,
        // avatar_name: join.avatar_name,
        avatar_image: join.avatar_image,
        avatar_color: join.avatar_color,
        roundScore: 0,
        currentScore: 0,
      };
      counter++;
      if(userList[0]){newUser.host=true}else{newUser.host=false}
      userList.push(newUser); // user added to userList
    socket.join(join.room);
    io.in(join.room).emit("joined", {room: room, userList: userList})
    }
  })
  socket.on('disconnect', () => {
    for (i = userList.length-1; i>=0; i--){
      if (userList[i]['id'] === socket.join.id){
      userList.splice(i, 1)
      }
    }
    console.log('user', socket.join.user, ', id', socket.join.id, 'disconnected', '.', userList.length, 'users still in room')
    if(userList[0] ){room = ''}
  })
})


const PORT = 4000;
server.listen(PORT, ()=> console.log(`Server listening on port PORT`))