import mongoose from 'mongoose';
import Chat from '../models/Chat.js';

// Crear un grupo
export const createGroup = async (req, res) => {
    try {
        const { name, description, userIds } = req.body;

        if (!name || !userIds || userIds.length === 0) {
            return res.status(400).json({ success: false, message: 'Faltan datos necesarios' });
        }

        console.log('Datos del grupo recibidos:', { name, description, userIds });

        const newGroup = new Chat({
            name,
            description,
            users: userIds,
            isGroup: true,
        });

        const savedGroup = await newGroup.save();
        console.log('Grupo creado:', savedGroup);

        res.status(201).json({ success: true, data: savedGroup });
    } catch (error) {
        console.error('Error al crear el grupo:', error);
        res.status(500).json({ success: false, message: 'Error al crear el grupo' });
    }
};

// Obtener los grupos del usuario
export const getChatsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'ID de usuario no válido' });
        }

        const chats = await Chat.find({ users: userId });

        console.log("Chats encontrados para el usuario:", chats);

        res.status(200).json({ success: true, data: chats });
    } catch (error) {
        console.error("Error al obtener los chats:", error);
        res.status(500).json({ success: false, message: 'Error al obtener los chats' });
    }
};
