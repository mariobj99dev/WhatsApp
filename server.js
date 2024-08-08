//server.js
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });

    // Manejar mensajes de texto
    socket.on('chatMessage', (data) => {
        console.log(`Mensaje recibido de ${data.username}: ${data.message}`);
        io.emit('chatMessage', data);  // Reenviar el mensaje a todos los clientes conectados, incluido el emisor
    });

    // Manejar mensajes de audio
    socket.on('chatAudio', (data) => {
        console.log(`Audio recibido de ${data.username}`);
        socket.broadcast.emit('chatAudio', data);  // Reenviar el audio a todos los clientes excepto al emisor
    });
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
