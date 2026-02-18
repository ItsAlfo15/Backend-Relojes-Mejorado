const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Watch Store API',
            version: '1.0.0',
            description: 'API para gestión de catálogo de relojes de lujo y autenticación',
        },
        servers: [
            {
                url: 'https://alfonso-backend-relojes.onrender.com',
                description: 'Servidor en Render',
            },
            {
                url: 'http://localhost:3060',
                description: 'Servidor Local',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: [path.join(__dirname, '../v1/routes/*.js')],
};

module.exports = swaggerJsdoc(options);