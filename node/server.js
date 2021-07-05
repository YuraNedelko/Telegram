const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  const room = socket.handshake.query.contact;

  socket.join(room);
  console.log(`user joined room #${room}`);

  socket.on('disconnect', () => {
    socket.leave(room);
    console.log('user disconnected');
  });

  socket.on('message', (msg) => {
    console.log('message');
    socket.to(room).broadcast.emit('message', msg);
  });

  socket.on('offer', (offer) => {
    console.log(`offer ${socket.id}`);
    socket.to(room).broadcast.emit('offer', offer, socket.id);
  });

  socket.on('offer-answer', (answer) => {
    console.log(`offer-answer ${socket.id}`);
    socket.to(room).broadcast.emit('offer-answer', answer);
  });

  socket.on('hang-up', () => {
    console.log(`hang up ${socket.id}`);
    socket.to(room).broadcast.emit('hang-up');
  });

  socket.on('new-ice-candidate', (candidate) => {
    console.log(`new-ice-candidate ${socket.id}`);
    socket.to(room).broadcast.emit('new-ice-candidate', candidate);
  });

  // socket.on('room-is-occupied', (socketId) => {
  //   console.log('room-is-occupied');
  //   io.to(socketId).emit('room-is-occupied');
  // });
});

server.listen(2223);
