const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();

const m = (name, text, id) => ({name, text, id});

io.on('connection', socket => {
  socket.on('userJoined', (data, callback) => {
    if (!data.name || !data.chatNumber) {
      return callback('Data not correct')
    }

    socket.join(data.chatNumber);

    users.remove(socket.id);
    users.add({
      id: socket.id,
      name: data.name,
      chatNumber: data.chatNumber
    });

    callback({userId: socket.id});

    io.to(data.chatNumber).emit('updateUsers', users.getByChat(data.chatNumber));

    socket.emit('newMessage', m('admin', `${data.name} welcome to chat`));
    socket.broadcast
      .to(data.chatNumber)
      .emit('newMessage', m('admin', `${data.name} enter to chat`))
  });

  socket.on('createMessage', (data, callback) => {
     if (!data.text) {
       return callback('Please enter the message')
     }

     const  user = users.get(data.id);
     if (user) {
       io.to(user.chatNumber).emit('newMessage', m(user.name, data.text, data.id));
     }

     callback()
  });

  socket.on('userLeft', (id, callback) => {
    const user = users.remove(id);
    if (user) {
      io.to(user.chatNumber).emit('updateUsers', users.getByChat(user.chatNumber));
      io.to(user.chatNumber).emit('newMessage', m('admin', `User ${user.name} left chat`));
    }

    callback();
  });

  socket.on('disconnect', () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.chatNumber).emit('updateUsers', users.getByChat(user.chatNumber));
      io.to(user.chatNumber).emit('newMessage', m('admin', `User ${user.name} left chat`));
    }
  })
});

module.exports = {
  app,
  server
};
