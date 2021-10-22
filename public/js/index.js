const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		show: 'principal',
		mostrarTabla: false,
		desactivarBoton: true,
		esTurno: false,
		mostrarContador:false,
		contador:0,
		timer:3,
		interval:null,
		option: '',
		turno: 0,
		turnoJugador: 0,
		jugadores: 0,
		quien: ["Pedro", "Juan", "Carlos", "Juanita", "Antonio", "Carolina", "Manu"],
		modulo: ["Nomina", "Facturacion", "Recibos", "Comprobante contable", "Usuarios", "Contabilidad"],
		error: ["404", "Stack overflow", "Memory out of range", "Null pointer", "Syntax error", "Encoding error"],
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
				imagen: '../assets/SENASOFT_IMG/img_personas/Pedro.png',
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
		});
		socket.on("mensaje-sala", (payload) => {
			console.log('mensaje desde sala', payload);
		});
		socket.on("iniciar-partida", (payload) => {
			this.iniciarJuego();
		});

		socket.on("fin-turno", (turnoGlobal) => {
			this.turno = turnoGlobal
			if (this.turnoJugador === this.turno) {
				this.show = 'empezarPartida'
			} else this.show = 'espera'
		});

		socket.on("fin-juego", (show) => {
			this.show = show
			this.mostrarTabla = false
		});
	},
	methods: {
		// empezarPartida(){
		// 	this.contador= ++this.contador;
		// 	if(this.contador==4){
		// 		this.mostrarContador=true;
		// 		this.interval = setInterval(()=>{
		// 			this.timer-=1,1000
		// 			if (this.timer==0) {
		// 				this.show='empezarPartida'						
		// 			}
		// 		},1000)
		// 	}

		// },
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
				this.turnoJugador = data.turno
				this.cartasJugador = data.cartasJugador
				this.secreto = data.secreto
				this.turno = data.turnoGlobal
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
				this.turnoJugador = data.turno
				this.cartasJugador = data.cartasJugador
				this.secreto = data.secreto
				this.turno = data.turnoGlobal
			});
			this.show = "salaCreada"
		},
		iniciarJuego() {
			this.mostrarTabla = true
			this.checkTurno()
		},

		mezclarCartas(cartas) {
			cartas.sort(() => Math.random() - 0.5);
		},

		preguntar() {
			let infoJuego = {
				room: this.room,
				pregunta: this.pregunta,
				jugador: this.turnoJugador
			}
			let j1,j2,j3,j4
			socket.emit('pregunta-jugador', infoJuego, async (data) => {
				console.log(data);
				j1 = await data.j1
				j2 = await data.j2
				j3 = await data.j3
				j4 = await data.j4
				
				if(j1){alert('jugador 1 tiene la carta: ' + j1.nombre)}
				if(j2){alert('jugador 2 tiene la carta: ' + j2.nombre)}
				if(j3){alert('jugador 3 tiene la carta: ' + j3.nombre)}
				if(j4){alert('jugador 4 tiene la carta: ' + j4.nombre)}
				this.turno = data.turnoGlobal
				this.pregunta =  {
					quien: '',
					modulo: '',
					error: '',
				},
				setTimeout(() => { this.checkTurno() }, 3000)
			})

			
		},
		acusar() {
			let infoJuego = {
				room: this.room,
				pregunta: this.pregunta,
				jugador: this.turnoJugador,
			}
			
			socket.emit('acusacion-jugador', infoJuego, async (data) => {
				this.turno = data.turnoGlobal
				let ganador = await data.ganador
				if (ganador){
					this.show = 'finJuego'
					this.mostrarTabla = false
				} else {
					alert('No acertaste')
					this.pregunta =  {
						quien: '',
						modulo: '',
						error: '',
					},
					setTimeout(() => { this.checkTurno() }, 3000)

				}
			})
		},
		checkTurno(){
			if (this.turnoJugador === this.turno) {
				this.show = 'empezarPartida'
			} else this.show = 'espera'
		}
	},
	computed: {
		faltanJugadores() {
			return this.jugadores >= 2 ? false : true
		},
	}
});

