const userService = require('../services/auth_service')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config()

const register = async (req, res) => {

    try {
        // Desectructuro los datos
        const { name, email, password } = req.body;

        // Creo el nuevo usuario y le asigno valores por defecto
        const newUser = await userService.register({ name, email, password });

        // Retorno mensaje de exito en el registro
        return res.status(201).send({
            status: "OK",
            message: "Usuario registrado con éxito",
            data: { name: newUser.name, email: newUser.email }
        });

    } catch (error) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        })
    }
}

const login = async (req, res) => {
    try {

        // Desectructuro los datos
        const { email, password } = req.body

        // Recojo el token generado y el usuario logueado
        const { accessToken, refreshToken, id, user } = await userService.login({ email, password });

        // Asigno el tiempo de expiracion del token, 
        // desde la fecha actual hasta el tiempo definido en el .env, 
        // luego con la formula lo paso a milisegundos
        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 1000),
            // Con / indico que esta cookie se enviara a todas las peticiones de mi dominio
            path: '/'
        }

        // Asigno un nombre, el token y las opciones a la cookie, 
        // de esta forma cada vez que haya una peticion, 
        // se podra leer la cookie para verificar al usuario
        res.cookie("jwt", accessToken, cookieOption);

        // Retorno tokens y el usuario
        res.status(200).send({
            status: "OK",
            message: "Usuario logueado correctamente",
            data: {
                accesstoken: accessToken,
                refreshToken: refreshToken,
                user: {
                    id: id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image
                }
            }
        });

    } catch (error) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        })
    }
}

const refreshToken = async (req, res) => {
    try {

        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                status: "FAILED",
                message: "Se necesita un token"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SEED
        );

        const user = await userService.getById(decoded.id)

        const userData = user.data();

        const newAccessToken = jwt.sign(
            {
                id: user.id,
                email: userData.email,
                role: userData.role,
            },
            process.env.SECRET_JWT_SEED,
            { expiresIn: process.env.ACCESS_JWT_EXPIRATION }
        );

        res.json({
            status: "OK",
            accessToken: newAccessToken
        })

    } catch (error) {
        return res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        })
    }
}

const verifyUser = (req, res) => {
    return res.json({
        status: "OK",
        data: req.user
    });
}

const getById = async (req, res) => {

    const { params: { id } } = req;

    try {
        const user = await userService.getById(id);

        const userData = user.data()

        // Devuelvo los datos
        res.send({
            status: "OK",
            data: userData
        })

    } catch (error) {
        // Devuelvo error
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        })
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    verifyUser,
    getById
}