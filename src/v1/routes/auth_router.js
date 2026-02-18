const authRouter = require('express').Router();
const authController = require('../../controllers/auth_controller');
const validateSchema = require("../../middlewares/watch_middleware/validate_schema")
const { registerSchema, loginSchema } = require('../../schemes/auth_schema')

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Registro de un nuevo usuario
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Error en los datos enviados (Zod)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
authRouter.post('/register', validateSchema(registerSchema), authController.register);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login correcto, devuelve el Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
authRouter.post('/login', validateSchema(loginSchema), authController.login);

/**
 * @swagger
 * /api/v1/user/refresh:
 *   post:
 *     summary: Refrescar token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refrescado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Se necesita un token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
authRouter.post('/refresh', authController.refreshToken);

module.exports = authRouter;
