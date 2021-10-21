const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		show: 'principal',
		option: '',
		quien: ["Pedro", "Juan", "Carlos", "Juanita", "Antonio", "Carolina", "Manu"],
		modulo: ["Nomina", "Facturacion", "Recibos", "Comprobante", "contable", "Usuarios", "Contabilidad"],
		error: ["404", "Stack overflow", "Memory out of range", "Null pointer", "Syntax error", "Encoding error"],
		rooms: [],
		room: '',
		turno: 0,
		jugadores: 0,
		pregunta: {
			quien: '',
			modulo: '',
			error: '',
		},
		cartas: [
			{
				Id: 1,
				Nombre: "Pedro",
				Tipo: "Quien",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 2,
				Nombre: "Juan",
				Tipo: "Quien",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 3,
				Nombre: "Carlos",
				Tipo: "Quien",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 4,
				Nombre: "Juanita",
				Tipo: "Quien",
				Tachado: false,
				imagen: '',
			},
			{
				Id: 5,
				Nombre: "Antonio",
				Tipo: "Quien",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 6,
				Nombre: "Carolina",
				Tipo: "Quien",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 7,
				Nombre: "Manu",
				Tipo: "Quien",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 8,
				Nombre: "Nomina",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 9,
				Nombre: "Facturación",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 10,
				Nombre: "Recibos",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 11,
				Nombre: "Comprobante contable",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 12,
				Nombre: "Usuarios",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 13,
				Nombre: "Contabilidad",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 14,
				Nombre: "404",
				Tipo: "Error",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 15,
				Nombre: "Stack overflow",
				Tipo: "Error",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 16,
				Nombre: "Memory out of range",
				Tipo: "Error",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 17,
				Nombre: "Null pointer",
				Tipo: "Error",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 18,
				Nombre: "Syntax error",
				Tipo: "Error",
				Tachado: false,
				imagen: '',
			},

			{
				Id: 19,
				Nombre: "Encoding error",
				Tipo: "Error",
				Tachado: false,
				imagen: '',
			},
		],
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
			return this.jugadores <= 4 ? false : true
		}
	}
});
