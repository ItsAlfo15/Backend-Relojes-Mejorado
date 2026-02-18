const queryWatchSchema = require('../../schemes/query_watch_schema');

const validateQuery = (req, res, next) => {
    try {
        const validatedQuery = queryWatchSchema.parse(req.query);

        req.query = validatedQuery;

        next();
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        });
    }
};

module.exports = validateQuery;
