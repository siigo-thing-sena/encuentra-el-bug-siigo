const app = new Vue({
	el: "#game",
	data: {
		ganador: 'false',
		show: 'principal',
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
		
		jugador1: {
			nombre: 'jugador1',
			turno: 1,
			tarjetas: ['Facturacion', 'Comprobante', 'contable', 'Syntax error']
		},
		jugador2: {
			nombre: 'jugador2',
			turno: 2,
			tarjetas: ['Carlos', 'Antonio', 'Manu', 'Usuarios']
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
		notas: [
			{}
		]
	},
	created() {
	},
	methods: {
		startGame() {
			this.show = 'juego'
			while (!ganador) {
				
			}
		},
		preguntar() {
			this.show = 'preguntar'

		},
		acusar() {
			this.show = 'preguntar'

		}
	},
});
