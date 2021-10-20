import {} from 'dotenv/config'
import {Server} from './models/server.js';

const server = new Server();
const turno = {number: 0};
const jugadores = {number: 0};
const rooms = []
const Quien = ["Pedro, Juan, Carlos, Juanita, Antonio, Carolina, Manu"];
const Modulo = ["Nomina", "Facturación", "Recibos", "Comprobante", "contable", "Usuarios", "Contabilidad"]
const error = ["404, Stack overflow, Memory out of range, Null pointer  , Syntax error, Encoding error"]

server.listen();

export {rooms, Quien, Modulo, error, turno, jugadores}