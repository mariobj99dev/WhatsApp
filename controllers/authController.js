// controllers/authController.js
import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await registerUser({ username, email, password });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    } 1
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser({ email, password });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
