import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import path from 'path';
import cors from 'cors';
import corsOptions from './config/corsConfig.js';

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

connectDB();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'profile.html'));
});

app.get('/chat.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'chat.html'));
});

app.get('/main.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'main.html'));
});

export default app;
