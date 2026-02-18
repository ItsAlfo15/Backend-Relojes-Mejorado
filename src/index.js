const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const cors = require('cors');
const port = process.env.PORT || 3060;

//const { dbConnection } = require('./config/config')

// Cargo las variables de entorno
require('dotenv').config();

// Creo el servidor
const app = express();

// Middlewares
app.use(express.static('public')); // Directorio publico (web)

app.use(cors()); // Cors

app.use(express.json()); // Permite leer json y parsear el body

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1/watch', require('./v1/routes/app_router')); // Rutas para relojes
app.use('/api/v1/user', require('./v1/routes/auth_router')); // Rutas para usuarios

app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto: ${port}`);
});