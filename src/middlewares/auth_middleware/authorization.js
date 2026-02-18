const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

// Permito el acceso solo a los admins
const onlyAdmin = (req, res, next) => {

    // Recojo el usuario con su cookie
    const userLogged = _checkCookie(req)

    // Impido el acceso si el usuario no es administrador
    if (userLogged && userLogged.role === 'admin') return next()

    // Retorno mensaje
    return res.status(403).send({
        status: "ERROR",
        data: { error: "El usuario no dispone de los permisos necesarios." }
    })
}

// Verifico la cookie
const _checkCookie = (req) => {
    try {
        // Si no hay cookie en los headers retorno null
        if (!req.headers.cookie) return null;

        // Recojo el jwt de los headers
        const cookieJWT = req.headers.cookie.split('; ').find(c => c.startsWith('jwt=')).slice(4)
        if (!cookieJWT) return null;

        // Verifico el token
        const tokenDecodificado = jwt.verify(cookieJWT, process.env.SECRET_JWT_SEED)
        
        // Retorno el token
        return tokenDecodificado
    } catch {
        return null
    }
}

module.exports = {
    onlyAdmin
}
