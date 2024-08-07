// server.js
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { handleSocketConnection } from './utils/socketHandlers.js';
import corsOptions from './config/corsConfig.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Configuración de Socket.IO usando la misma configuración de CORS
const io = new Server(server, {
    cors: corsOptions,
});

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    handleSocketConnection(socket, io);
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
