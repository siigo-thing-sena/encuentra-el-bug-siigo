const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		show: 'principal',
		mostrarTabla: false,
		option: '',
		turno: 0,
		jugadores: 0,
		quien: ["Pedro", "Juan", "Carlos", "Juanita", "Antonio", "Carolina", "Manu"],
		modulo: ["Nomina", "Facturacion", "Recibos", "Comprobante", "contable", "Usuarios", "Contabilidad"],
		error: ["404", "Stack overflow", "Memory out of range", "Null pointer", "Syntax error", "Encoding error"],
		rooms: [],
		room: '',
		cartasJugador: [],
		pregunta: {
			quien: '',
			modulo: '',
			error: '',
		},
		secreto: [],
		cartas2: [
			{ quien: "Pedro", modulo: "Nomina", error: "404" },
			{ quien: "Juan", modulo: "Facturacion", error: "Stack overflow" },
			{ quien: "Carlos", modulo: "Recibos", error: "out of range" },
			{ quien: "Juanita", modulo: "Comprobante", error: "Null pointer" },
			{ quien: "Antonio", modulo: "contable", error: "Syntax error" },
			{ quien: "Carolina", modulo: "Usuarios", error: "Encoding error" },
			{ quien: "Manu", modulo: "Contabilidad", error: "" },
		],
		cartas: [
			{
				id: 1,
				nombre: "Pedro",
				tipo: "Quien",
				tachado: false,
				imagen:'../assets/SENASOFT_IMG/img_personas/Pedro.png',
			},

			{
				id: 2,
				nombre: "Juan",
				tipo: "Quien",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Juan.png',
			},

			{
				id: 3,
				nombre: "Carlos",
				tipo: "Quien",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Carlos.png',
			},

			{
				id: 4,
				nombre: "Juanita",
				tipo: "Quien",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Juanita.png',
			},
			{
				id: 5,
				nombre: "Antonio",
				tipo: "Quien",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Antonio.png',
			},

			{
				id: 6,
				nombre: "Carolina",
				tipo: "Quien",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Carlina.png',
			},

			{
				id: 7,
				nombre: "Manu",
				tipo: "Quien",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Manu.png',
			},

			{
				id: 8,
				nombre: "Nomina",
				tipo: "Modulo",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Nomina.png',
			},

			{
				id: 9,
				nombre: "Facturación",
				tipo: "Modulo",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Facturación.png',
			},

			{
				id: 10,
				nombre: "Recibos",
				tipo: "Modulo",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Recibos.png',
			},

			{
				id: 11,
				nombre: "Comprobante contable",
				tipo: "Modulo",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Comprobantecontable.png',
			},

			{
				id: 12,
				nombre: "Usuarios",
				tipo: "Modulo",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Usuarios.png',
			},

			{
				id: 13,
				nombre: "Contabilidad",
				tipo: "Modulo",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Contabilidad.png',
			},

			{
				id: 14,
				nombre: "404",
				tipo: "Error",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/404.png',
			},

			{
				id: 15,
				nombre: "Stack overflow",
				tipo: "Error",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Stackoverflow.png',
			},

			{
				id: 16,
				nombre: "Memory out of range",
				tipo: "Error",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Memoryoutofrange.png',
			},

			{
				id: 17,
				nombre: "Null pointer",
				tipo: "Error",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Nullpointer.png',
			},

			{
				id: 18,
				nombre: "Syntax error",
				tipo: "Error",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Syntaxerror.png',
			},

			{
				id: 19,
				nombre: "Encoding error",
				tipo: "Error",
				tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Encodingerror.png',
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
		socket.on("iniciar-partida", (payload) => {
			this.iniciarJuego();
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
				console.log(data)
				this.jugadores = data.jugadores
				this.rooms = data.rooms
				this.turno = data.turno
				this.cartasJugador = data.cartasJugador
				this.secreto = data.secreto
			});
			this.show = "salaCreada"
		},
		joinRoom() {
			if (this.turno >=4 ){
				alert('sala llena')
				return
			}
			let roomData = {
				room: this.room,
				jugador: 1
			}
			socket.emit('create-join-room', roomData, (data) => {
				this.jugadores = data.jugadores
				this.rooms = data.rooms
				this.turno = data.turno
				this.cartasJugador = data.cartasJugador
				this.secreto = data.secreto
			});
			this.show = "salaCreada"
		},
		iniciarJuego() {

			this.mezclarCartas(this.cartas)
			console.log(this.cartas)

			const tipos = ["Error", "Modulo", "Quien"]
			for (let i = 0; i < tipos.length; i++) {
				let found = this.cartas.find(element => element.Tipo === tipos[i]);
				this.secreto.push(found)
			}
			for (let i = 0; i < secreto.length; i++) {
				let cartas = cartas.filter((carta) => {
					return carta.Nombre !== this.secreto[i].Nombre;
				});
			}
			let j1 = cartas.splice(0, cartas.length / 4);
			let j2 = cartas.splice(0, cartas.length / 3);
			let j3 = cartas.splice(0, cartas.length / 2);
			let j4 = cartas.splice(0, cartas.length);
		},

		mezclarCartas(cartas) {
			cartas.sort(() => Math.random() - 0.5);
		},

		preguntar() {
			this.show = 'preguntar'

			for (let index = 1; index <= this.jugadores.length; index++) {
				console.log('turno:', index);
				if (this.turno === index) { index++ }
				console.log('turno:', index);
				if (index > this.jugadores.length) { return }
				let tarjetas = this.jugadores[index - 1].tarjetas
				if (tarjetas.includes(this.pregunta.quien)) { console.log('tarjeta encontrada'); }
				if (tarjetas.includes(this.pregunta.modulo)) { console.log('tarjeta encontrada'); }
				if (tarjetas.includes(this.pregunta.error)) { console.log('tarjeta encontrada'); }
			}
		},
		acusar() {
			this.show = 'preguntar'
			console.log(this.pregunta === this.secreto);
			if (
				this.pregunta.quien === this.secreto.quien &&
				this.pregunta.modulo === this.secreto.modulo &&
				this.pregunta.error === this.secreto.error
			) { this.ganador = true; alert('yep') }
			alert('nope')
		},
	},
	computed: {
		faltanJugadores() {
			return this.jugadores <= 4 ? false : true
		}
	}
});

