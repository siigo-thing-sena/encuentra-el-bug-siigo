import {rooms, Quien, Modulo, error, turno} from '../app.js'

const socketController = (socket) => {
  console.log("cliente conectado ", socket.id);

  socket.on("disconnect", () => {
    console.log("cliente desconectado", socket.id);
  });
  // crear sala
  socket.on('create-join-room', (room, callback) => {
    socket.join(room);
    callback(socket.id + ' se ha unido a sala: ' + room)
  });
  socket.on('sala-mensaje', (room) => {
    socket.to(room).emit('mensaje-sala', room)
  })

};

export { socketController };
