import { rooms, Quien, Modulo, error, turno, jugadores } from '../app.js'

var numClients = {};

const socketController = (socket) => {
  console.log("cliente conectado ", socket.id);

  socket.on("disconnect", () => {
    numClients[socket.room]--;
  });
  // crear o unirse a sala
  socket.on('create-join-room', (data, callback) => {
    socket.join(data.room);
    if (!rooms.includes(data.room)) {
      rooms.push(data.room)
    }
    if (numClients[data.room] == undefined) {
      numClients[data.room] = 1;
    } else {
      numClients[data.room]++;
    }
    jugadores.number += data.jugador
    turno.number += data.jugador
    let roomData = {
      rooms: rooms,
      jugadores: numClients[data.room],
      turno: numClients[data.room]
    }

    callback(roomData)
    socket.to(data.room).emit('nuevo-jugador', roomData)
  });

  socket.on('sala-mensaje', (room) => {
  })

  socket.on('sala-mensaje', (room) => {
    socket.to(room).emit('mensaje-sala', room)
  })

};

export { socketController };
