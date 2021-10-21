const app = new Vue({
	el: "#game",
	data: {
		show: 'principal',
		ganador: false,
		desactivarBoton: true,
		turno: 1,
		option: '',
		cartas2:[ 
			{quien: "Pedro", modulo: "Nomina", error: "404"},
			{quien: "Juan", modulo: "Facturacion", error: "Stack overflow"},
			{quien: "Carlos", modulo: "Recibos", error: "out of range"},
			{quien: "Juanita", modulo: "Comprobante", error: "Null pointer"},
			{quien: "Antonio", modulo: "contable", error: "Syntax error"},
			{quien: "Carolina", modulo: "Usuarios", error: "Encoding error"},
			{quien: "Manu", modulo: "Contabilidad", error: ""},
		],
		pregunta: {
			quien: '',
			modulo: '',
			error: '',
		},
		secreto: {
			quien: 'Pedro',
			modulo: 'Nomina',
			error: '404',
		},

		jugadores: [
			{
				nombre: 'jugador1',
				turno: 1,
				tarjetas: ['Facturacion', 'Comprobante', 'contable', 'Syntax error']
			},
			{
				nombre: 'jugador2',
				turno: 2,
				tarjetas: ['Carlos', 'Antonio', 'Manu', 'Usuarios']
			},
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
		notas: [
			{}
		]
	},
	created() {
	},
	methods: {
		startGame() {
			let jugador = this.jugadores[this.turno - 1]
			if (jugador.turno === this.turno) {
				this.show = 'juego'
				this.desactivarBoton = false;
			} else this.show = 'espera'

			if (this.option === 'preguntar') { this.preguntar() }
			if (this.option === 'acusar') { this.acusar() }
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
		saltarTurno() {
			if (this.turno === 4) { this.turno = 1 }
			else { this.turno++ }
		}
	},
});
