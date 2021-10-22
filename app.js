import { } from 'dotenv/config'
import { Server } from './models/server.js';

const server = new Server();
const turno = { number: 0 };
const jugadores = { number: 0 };
const rooms = []
const secreto = []
const cartas = [
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
]

server.listen();

export { rooms, secreto, turno, jugadores, cartas }