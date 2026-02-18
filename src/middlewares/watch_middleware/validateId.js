const validateId = (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id || id.trim() === "") {
            return res.status(400).json({
                status: "FAILED",
                data: { error: "El parámetro ':id' no puede estar vacío" }
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        });
    }
};

module.exports = validateId;
