import { rooms, secreto, turno, jugadores, cartas } from '../app.js'

let numClients = {};
let j1, j2, j3, j4
let cartasFiltradas
let turnoGlobal = 1

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
      jugadores: numClients[data.room],
      turno: numClients[data.room],
      secreto: secreto,
      cartasJugador: cartas,
      turnoGlobal: turnoGlobal
    }

    callback(roomData)
    socket.to(data.room).emit('nuevo-jugador', roomData)
  });

  socket.on('pregunta-jugador', (data, callback) => {
    if (turnoGlobal === 2) {
      turnoGlobal = 1
    } else { turnoGlobal++ }
    console.log(data.pregunta);
    let found, foundj1, foundj2, foundj3, foundj4

    found = j1.find(j1 => j1.nombre === data.pregunta.quien)
    if (found) { foundj1 = found }
    found = j1.find(j1 => j1.nombre === data.pregunta.modulo)
    if (found) { foundj1 = found }
    found = j1.find(j1 => j1.nombre === data.pregunta.error)

    if (found) { foundj2 = found }
    found = j2.find(j2 => j2.nombre === data.pregunta.quien)
    if (found) { foundj2 = found }
    found = j2.find(j2 => j2.nombre === data.pregunta.modulo)
    if (found) { foundj2 = found }
    found = j2.find(j2 => j2.nombre === data.pregunta.error)
    if (found) { foundj2 = found }

    found = j3.find(j3 => j3.nombre === data.pregunta.quien)
    if (found) { foundj3 = found }
    found = j3.find(j3 => j3.nombre === data.pregunta.modulo)
    if (found) { foundj3 = found }
    found = j3.find(j3 => j3.nombre === data.pregunta.error)
    if (found) { foundj3 = found }

    found = j4.find(j4 => j4.nombre === data.pregunta.quien)
    if (found) { foundj4 = found }
    found = j4.find(j4 => j4.nombre === data.pregunta.modulo)
    if (found) { foundj4 = found }
    found = j4.find(j4 => j4.nombre === data.pregunta.error)
    if (found) { foundj4 = found }


    let dataGame = {
      j1: foundj1,
      j2: foundj2,
      j3: foundj3,
      j4: foundj4,
      turnoGlobal: turnoGlobal
    }
    console.log(foundj2);

    callback(dataGame)

    socket.to(data.room).emit('fin-turno', turnoGlobal)
  })

  socket.on('acusacion-jugador', (data, callback) => {
    if (turnoGlobal === 2) {
      turnoGlobal = 1
    } else { turnoGlobal++ }
    let ganador = false

    if (
      data.pregunta.quien === secreto[2].nombre &&
      data.pregunta.modulo === secreto[1].nombre &&
      data.pregunta.error === secreto[0].nombre
    ) { console.log('ganador'); ganador = true }
    else { console.log('nope');}

    let dataGame = {
      turnoGlobal: turnoGlobal,
      ganador: ganador
    }

    callback(dataGame)
    if(ganador){
      let show = 'finJuego'
      socket.to(data.room).emit('fin-juego', show)
    } else {
      socket.to(data.room).emit('fin-turno', turnoGlobal)
    }

  })

  socket.on('sala-mensaje', (room) => {
    socket.to(room).emit('mensaje-sala', room)
  })

};

export { socketController };
