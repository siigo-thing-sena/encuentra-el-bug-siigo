const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		serverStatus: 'offline',
		ready: false,
		Quien: ["Pedro, Juan, Carlos, Juanita, Antonio, Carolina, Manu"],
		Modulo: ["Nomina", "Facturación", "Recibos", "Comprobante", "contable", "Usuarios", "Contabilidad"],
		error: ["404, Stack overflow, Memory out of range, Null pointer  , Syntax error, Encoding error"],
		room: '',
	},
	created() {
		socket.on("connect", () => {
			this.serverStatus = "online";
			console.log("Conectado");
		});

		socket.on("disconnect", () => {
			this.serverStatus = "offline";
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
			let room = this.room
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
