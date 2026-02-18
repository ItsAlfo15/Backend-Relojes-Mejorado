const onlyAdmin = (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                status: "FAILED",
                message: "Token requerido"
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                status: "FAILED",
                message: "El usuario no dispone de los permisos necesarios."
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Error al verificar permisos"
        });
    }
}

module.exports = onlyAdmin;