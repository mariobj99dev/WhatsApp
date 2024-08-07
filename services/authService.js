import User from '../models/User.js'

export const registerUser = async ({ username, email, password }) => {
    const user = new User({ username, email, password });
    await user.save();
    return user;
}

export const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    if (user.password !== password) {
        throw new Error('Contraseña incorrecta');
    }

    return user;
};