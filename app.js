import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 3000;

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' })
})

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.emit('mensaje', 'Bienvenido al servidor Socket.IO!');

    socket.on('mensaje', (msg) => {
        console.log('Mensaje recibido:', msg);
        io.emit('mensaje', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

httpServer.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});