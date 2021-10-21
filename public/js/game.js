const app = new Vue({
	el: "#game",
	data: {
		show: 'principal',
		ganador: false,
		desactivarBoton: true,
		turno: 1,
		option: '',
		quien: ["Pedro", "Juan", "Carlos", "Juanita", "Antonio", "Carolina", "Manu"],
		modulo: ["Nomina", "Facturacion", "Recibos", "Comprobante", "contable", "Usuarios", "Contabilidad"],
		error: ["404", "Stack overflow", "Memory out of range", "Null pointer", "Syntax error", "Encoding error"],
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
			
			if(this.option === 'preguntar') {this.preguntar()}
			if(this.option === 'acusar') {this.acusar()}
		},
		preguntar() {
			this.show = 'preguntar'

			for (let index = 1; index <= this.jugadores.length; index++) {
				console.log('turno:', index);
				if(this.turno === index) {index ++}
				console.log('turno:', index);
				if(index > this.jugadores.length){return}
				let tarjetas = this.jugadores[index-1].tarjetas
				if(tarjetas.includes(this.pregunta.quien)){console.log('tarjeta encontrada');}
				if(tarjetas.includes(this.pregunta.modulo)){console.log('tarjeta encontrada');}
				if(tarjetas.includes(this.pregunta.error)){console.log('tarjeta encontrada');}
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
			if(this.turno === 4){ this.turno = 1}
			else {this.turno ++}
		}
	},
});
