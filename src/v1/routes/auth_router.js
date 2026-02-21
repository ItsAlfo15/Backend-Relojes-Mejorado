const authRouter = require('express').Router();
const authController = require('../../controllers/auth_controller');
const verifyToken = require('../../middlewares/auth_middleware/verifyToken');
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

/**
 * @swagger
 * /api/v1/user/me:
 *   get:
 *     summary: Obtener datos del usuario logueado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
authRouter.get('/me', verifyToken, authController.verifyUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
authRouter.get('/:id', verifyToken, authController.getById)

module.exports = authRouter;
