const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		show: 'principal',
		mostrarTabla: false,
		option: '',
		quien: ["Pedro", "Juan", "Carlos", "Juanita", "Antonio", "Carolina", "Manu"],
		modulo: ["Nomina", "Facturacion", "Recibos", "Comprobante", "contable", "Usuarios", "Contabilidad"],
		error: ["404", "Stack overflow", "Memory out of range", "Null pointer", "Syntax error", "Encoding error"],
		cartas2: [
			{ quien: "Pedro", modulo: "Nomina", error: "404" },
			{ quien: "Juan", modulo: "Facturacion", error: "Stack overflow" },
			{ quien: "Carlos", modulo: "Recibos", error: "out of range" },
			{ quien: "Juanita", modulo: "Comprobante", error: "Null pointer" },
			{ quien: "Antonio", modulo: "contable", error: "Syntax error" },
			{ quien: "Carolina", modulo: "Usuarios", error: "Encoding error" },
			{ quien: "Manu", modulo: "Contabilidad", error: "" },
		],
		rooms: [],
		room: '',
		turno: 0,
		jugadores: 0,
		pregunta: {
			quien: '',
			modulo: '',
			error: '',
		},
		secreto: [],
		cartas: [
			{
				Id: 1,
				Nombre: "Pedro",
				Tipo: "Quien",
				Tachado: false,
				imagen:'../assets/SENASOFT_IMG/img_personas/Pedro.png',
			},

			{
				Id: 2,
				Nombre: "Juan",
				Tipo: "Quien",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Juan.png',
			},

			{
				Id: 3,
				Nombre: "Carlos",
				Tipo: "Quien",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Carlos.png',
			},

			{
				Id: 4,
				Nombre: "Juanita",
				Tipo: "Quien",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Juanita.png',
			},
			{
				Id: 5,
				Nombre: "Antonio",
				Tipo: "Quien",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Antonio.png',
			},

			{
				Id: 6,
				Nombre: "Carolina",
				Tipo: "Quien",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Carlina.png',
			},

			{
				Id: 7,
				Nombre: "Manu",
				Tipo: "Quien",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_personas/Manu.png',
			},

			{
				Id: 8,
				Nombre: "Nomina",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Nomina.png',
			},

			{
				Id: 9,
				Nombre: "Facturación",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Facturación.png',
			},

			{
				Id: 10,
				Nombre: "Recibos",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Recibos.png',
			},

			{
				Id: 11,
				Nombre: "Comprobante contable",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Comprobantecontable.png',
			},

			{
				Id: 12,
				Nombre: "Usuarios",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Usuarios.png',
			},

			{
				Id: 13,
				Nombre: "Contabilidad",
				Tipo: "Modulo",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_modulos/Contabilidad.png',
			},

			{
				Id: 14,
				Nombre: "404",
				Tipo: "Error",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/404.png',
			},

			{
				Id: 15,
				Nombre: "Stack overflow",
				Tipo: "Error",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Stackoverflow.png',
			},

			{
				Id: 16,
				Nombre: "Memory out of range",
				Tipo: "Error",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Memoryoutofrange.png',
			},

			{
				Id: 17,
				Nombre: "Null pointer",
				Tipo: "Error",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Nullpointer.png',
			},

			{
				Id: 18,
				Nombre: "Syntax error",
				Tipo: "Error",
				Tachado: false,
				imagen: '../assets/SENASOFT_IMG/img_errores/Syntaxerror.png',
			},

			{
				Id: 19,
				Nombre: "Encoding error",
				Tipo: "Error",
				Tachado: false,
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
		iniciarJuego() {

			// 
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
			let j1 = cartas.splice(0, (cartas.length / 4));
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

