// app.js (revisado)
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import path from 'path';
import cors from 'cors';
import corsOptions from './config/corsConfig.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Aplicar la configuración de CORS a Express
app.use(cors(corsOptions));

connectDB();

// Servir archivos estáticos desde la carpeta 'public'
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de Autenticación
app.use('/api/auth', authRoutes);

// Redirigir la ruta raíz '/' a la página de login
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Rutas para servir las páginas
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;
