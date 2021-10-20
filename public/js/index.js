const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		Quien: ["Pedro, Juan, Carlos, Juanita, Antonio, Carolina, Manu"],
		Modulo: ["Nomina", "Facturación", "Recibos", "Comprobante", "contable", "Usuarios", "Contabilidad"],
		error: ["404, Stack overflow, Memory out of range, Null pointer  , Syntax error, Encoding error"],
		rooms: [],
		room: '',
		turno: 0,
		jugadores: 0,
		show: 'principal'
	},
	created() {
		socket.on("connect", () => {
			console.log("Conectado");
		});

		socket.on("disconnect", () => {
			console.log("Desconectado");
		});
		socket.on("nuevo-jugador", (data) => {
			this.jugadores = data.jugadores
			this.rooms = data.rooms
		});
		socket.on("mensaje-sala", (payload) => {
			console.log('mensaje desde sala', payload);
		});
	},
	methods: {
		mensajeSala() {
			socket.emit('sala-mensaje', this.room)
		},
		createRoom() {
			const randomNumber = Math.floor(100000 + Math.random() * 900000)
			this.room = randomNumber.toString(16)
			let roomData = {
				room: this.room,
				jugador: 1
			}
			socket.emit('create-join-room', roomData, (data) => {
				this.jugadores = data.jugadores
				this.rooms = data.rooms
				this.turno = data.turno
			});
			this.show = "salaCreada"
		},
		joinRoom() {
			let roomData = {
				room: this.room,
				jugador: 1
			}
			socket.emit('create-join-room', roomData, (data) => {
				this.jugadores = data.jugadores
				this.rooms = data.rooms
				this.turno = data.turno
			});
			this.show = "salaCreada"
		},
	},
	computed: {
		faltanJugadores(){
			return this.jugadores < 4 ? false : true
		}
	}
});
