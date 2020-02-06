const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const m = (name, text, id) => ({name, text, id});

io.on('connection', socket => {
  socket.on('userJoined', (data, callback) => {
    if (!data.name || !data.chatNumber) {
      return callback('Data not correct')
    }

    socket.join(data.chatNumber);
    callback({userId: socket.id});

    socket.emit('newMessage', m('admin', `${data.name} welcome to chat`));
    socket.emit('newMessage', m('TEST', 'Welcome to chat'));
    socket.broadcast
      .to(data.chatNumber)
      .emit('newMessage', m('admin', `${data.name} enter to chat`))
  });

  socket.on('createMessage', data => {
    setTimeout(() => {
      socket.emit('newMessage', {
        text: data.text + ' SERVER'
      })
    }, 500)
  })
});

module.exports = {
  app,
  server
};
