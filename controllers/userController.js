import mongoose from 'mongoose';
import User from '../models/User.js';

export const getUsersExcludingCurrent = async (req, res) => {
    try {
        const currentUserId = req.query.userId;

        if (!mongoose.Types.ObjectId.isValid(currentUserId)) {
            return res.status(400).json({ success: false, message: 'ID de usuario no válido' });
        }

        // Excluir al usuario actual de la lista de usuarios
        const users = await User.find({ _id: { $ne: currentUserId } });

        console.log("Usuarios encontrados:", users);

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ success: false, message: 'Error al obtener usuarios' });
    }
};
