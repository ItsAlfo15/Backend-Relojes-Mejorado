const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            status: error?.status, message: error?.message || error,
        });
    }
};

module.exports = validateSchema;
