// utils/socketHandlers.js

export const handleSocketConnection = (socket, io) => {
    console.log(`Nuevo cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });

    // Manejador para el evento de mensaje
    socket.on('chatMessage', (data) => {
        if (data.username && data.message) {
            // Emitir el mensaje a todos los clientes junto con el nombre de usuario que lo envió
            io.emit('chatMessage', { username: data.username, message: data.message });
        } else {
            console.error('Mensaje no enviado, falta el nombre de usuario o el mensaje');
        }
    });
};
