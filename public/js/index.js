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
		show: 'principal'
	},
	created() {
		socket.on("connect", () => {
			console.log("Conectado");
		});

		socket.on("disconnect", () => {
			console.log("Desconectado");
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
			const room = randomNumber.toString(16)
			socket.emit('create-join-room', room, (data) => {
				console.log(data)
			});

			socket.on("test", () => {
				console.log('mensaje para sala');
			});
		},
		joinRoom() {
			let room = this.room;

			socket.emit('create-join-room', room, (data) => {
				console.log(data)
			});
		},
	},
});
