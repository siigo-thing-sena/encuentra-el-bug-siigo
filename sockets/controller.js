import { rooms, secreto, turno, jugadores, cartas } from '../app.js'

var numClients = {};
let j1, j2, j3, j4
let cartasFiltradas

let mezclarCartas = () => {
  cartas.sort(() => Math.random() - 0.5);
}

let crearSecreto = () => {
  for (let i = 0; i < tipos.length; i++) {
    let found = cartas.find(element => element.tipo === tipos[i]);
    secreto.push(found)
  }
}

let filtrarSecreto = () => {
  cartasFiltradas = cartas
  for (let i = 0; i < secreto.length; i++) {
    cartasFiltradas = cartasFiltradas.filter((carta) => {
      return carta.nombre !== secreto[i].nombre;
    });
    console.log(cartasFiltradas.length);
  }
  console.log(secreto.length);
}

let repartirCartas = () => {
  j1 = cartasFiltradas.splice(0, cartasFiltradas.length / 4);
  j2 = cartasFiltradas.splice(0, cartasFiltradas.length / 3);
  j3 = cartasFiltradas.splice(0, cartasFiltradas.length / 2);
  j4 = cartasFiltradas.splice(0, cartasFiltradas.length);
}

const tipos = ["Error", "Modulo", "Quien"]

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
      mezclarCartas()
      crearSecreto()
      filtrarSecreto()
      repartirCartas()
    }
    if (numClients[data.room] == undefined) {
      numClients[data.room] = 1;
    } else {
      numClients[data.room]++;
    }
    jugadores.number += data.jugador
    turno.number += data.jugador

    let cartas = []

    if (turno.number === 1) { cartas = j1 }
    if (turno.number === 2) { cartas = j2 }
    if (turno.number === 3) { cartas = j3 }
    if (turno.number === 4) { cartas = j4 }

    let roomData = {
      rooms: rooms,
      jugadores: numClients[data.room],
      turno: numClients[data.room],
      secreto: secreto,
      cartasJugador: cartas
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
