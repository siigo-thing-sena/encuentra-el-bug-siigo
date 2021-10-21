import {} from 'dotenv/config'
import {Server} from './models/server.js';

const server = new Server();
const turno = {number: 0};
const jugadores = {number: 0};
const rooms = []
const secreto = []

server.listen();

export {rooms, secreto, turno, jugadores}