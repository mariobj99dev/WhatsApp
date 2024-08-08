// public/scripts/audio.js
import { socket } from './socket.js';

export const handleAudio = (username) => {
    const messagesDiv = document.getElementById('messages');
    const startRecordingButton = document.getElementById('startRecording');
    const stopRecordingButton = document.getElementById('stopRecording');

    let mediaRecorder;
    let audioChunks = [];

    startRecordingButton.addEventListener('click', () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                startRecordingButton.classList.add('hidden');
                stopRecordingButton.classList.remove('hidden');

                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener('stop', () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    audioChunks = [];
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audioElement = document.createElement('audio');
                    audioElement.src = audioUrl;
                    audioElement.controls = true;

                    const msgElement = document.createElement('p');
                    msgElement.classList.add('self');
                    msgElement.appendChild(audioElement);
                    messagesDiv.appendChild(msgElement);
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;

                    // Enviar el audio al servidor
                    socket.emit('chatAudio', { username, audio: audioBlob });
                });
            });
    });

    stopRecordingButton.addEventListener('click', () => {
        mediaRecorder.stop();
        startRecordingButton.classList.remove('hidden');
        stopRecordingButton.classList.add('hidden');
    });

    socket.on('chatAudio', (data) => {
        const audioBlob = new Blob([data.audio], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = document.createElement('audio');
        audioElement.src = audioUrl;
        audioElement.controls = true;

        const msgElement = document.createElement('p');
        msgElement.classList.add('other');
        msgElement.appendChild(audioElement);
        messagesDiv.appendChild(msgElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
};
