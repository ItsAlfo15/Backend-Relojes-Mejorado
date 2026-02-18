const { DB } = require('../config/firebase_config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config()

const collection = DB.collection('users');

// Registro de usuario
const register = async (user) => {

    try {
        // Desectructuro los datos
        const { name, email, password } = user;

        // Me traigo el documento del usuario para verificar si existe el correo
        const usuarioAVerificar = await collection.where('email', '==', email).get()

        // Devuelvo error en caso de que el email ya exista
        if (usuarioAVerificar.exists) {
            throw {
                status: 400,
                message: "Este correo ya está registrado"
            }
        }

        // Esto aumenta la seguridad añadiendo una cadena aleatoria a la contraseña
        // Evito que si dos usuarios tienen la misma contraseña,
        // esta comparta el mismo hash
        const salt = await bcrypt.genSalt(5)
        const hashPassword = await bcrypt.hash(password, salt)

        // Creo el nuevo usuario y le asigno valores por defecto
        const newUser = {
            name: name,
            email: email,
            password: hashPassword,
            image: 'public/avatars/avatar_default.png',
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const doc = await collection.add(newUser)

        // Retorno un objeto con el id y los datos del usuario
        return { id: doc.id, ...newUser }

    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

// Login de usuario
const login = async (user) => {

    try {
        // Desectructuro los datos
        const { email, password } = user

        // Me traigo un documento del usuario coincidente
        const usuarioAVerificar = await collection.where('email', '==', email).get()

        // Devuelvo error en caso de que el email no exixta
        if (!usuarioAVerificar.exists) {
            throw {
                status: 400,
                message: "Hubo un error al iniciar sesión"
            };
        }

        // Me quedo con la primera ocurrencia del correo, se hace por seguridad
        const doc = usuarioAVerificar.docs[0]

        // Recojo la data del usuario
        const userData = doc.data()

        // Verifico que la contraseña sea la correcta
        const loginCorrecto = await bcrypt.compare(password, userData.password)

        // Devuelvo error en caso de que la contraseña no sea la correcta
        if (!loginCorrecto) {
            throw {
                status: 400,
                message: "Hubo un error al iniciar sesión"
            };
        }

        // Genero el JWT con los datos del usuario
        const accessToken = jwt.sign(
            {
                id: doc.id,
                email: userData.email,
                role: userData.role,
            },
            process.env.SECRET_JWT_SEED,
            { expiresIn: process.env.ACCESS_JWT_EXPIRATION }
        )

        const refreshToken = jwt.sign(
            { id: doc.id },
            process.env.REFRESH_TOKEN_SEED,
            { expiresIn: process.env.REFRESH_JWT_EXPIRATION }
        )

        // Retorno ambos token y los datos del usuario
        return {
            accessToken,
            refreshToken,
            user: userData
        };

    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }

}

const refreshToken = async (userId) => {
    try {

        const user = await collection.doc(userId).get()

        if (!user.exists) {
            throw {
                status: 401,
                message: "Usuario no encontrado"
            }
        }

        return user;

    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error
        }
    }
}

module.exports = {
    register,
    login,
    refreshToken
}

