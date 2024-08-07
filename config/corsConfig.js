// config/corsConfig.js
const corsOptions = {
    origin: '*', // Puedes ajustar esto según las necesidades de seguridad de tu aplicación
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Si necesitas permitir cookies y autenticaciones
};

export default corsOptions;
