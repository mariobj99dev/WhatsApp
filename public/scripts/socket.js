// public/scripts/socket.js
export const socket = io();  // Conectar al servidor de Socket.IO

export const handleMessages = (username) => {
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');

    socket.on('connect', () => {
        document.getElementById('status').innerText = `Connected as: ${username}`;
        console.log('Connected:', socket.id);
    });

    socket.on('disconnect', () => {
        document.getElementById('status').innerText = 'Disconnected';
        console.log('Disconnected');
    });

    socket.on('chatMessage', (data) => {
        console.log('Received message:', data);
        const msgElement = document.createElement('p');
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msgElement.innerHTML = `${data.username}: ${data.message} <span class="time">${time}</span>`;

        if (data.username === username) {
            msgElement.classList.add('self');
        } else {
            msgElement.classList.add('other');
        }

        messagesDiv.appendChild(msgElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto scroll to bottom
    });

    messageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage(username);
        }
    });

    const sendMessage = (username) => {
        const msg = messageInput.value;
        if (msg) {
            console.log('Sending message:', msg);  // Verificar si se está enviando
            socket.emit('chatMessage', { username, message: msg });
            messageInput.value = '';  // Limpiar el input después de enviar
        }
    };
};
