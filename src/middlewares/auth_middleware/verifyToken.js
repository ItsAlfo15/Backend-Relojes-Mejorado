const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {

        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                status: "FAILED",
                message: "Token requerido"
            });
        }

        const token = authHeader.replace("Bearer", "");

        const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            status: "FAILED",
            message: "Token inválido o expirado"
        })
    }
}

module.exports = { verifyToken }