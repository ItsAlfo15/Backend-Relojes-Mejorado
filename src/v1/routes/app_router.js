const watchRouter = require('express').Router();
const controller = require('../../controllers/watch_controller');
const validateId = require('../../middlewares/watch_middleware/validateId');
const validateSchema = require("../../middlewares/watch_middleware/validate_schema")
const postWatchSchema = require('../../schemes/post_watch_schema');
const updateWatchSchema = require('../../schemes/update_watch_schema');
const validateQuery = require('../../middlewares/watch_middleware/validate_query')
const onlyAdmin = require('../../middlewares/auth_middleware/authorization');
const verifyToken = require('../../middlewares/auth_middleware/verifyToken')

/**
 * @swagger
 * /api/v1/watch:
 *   get:
 *     summary: Obtener todos los relojes
 *     tags: [Watches]
 *     responses:
 *       200:
 *         description: Lista de relojes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
watchRouter.get('/', validateQuery, controller.getAllWatches);

/**
 * @swagger
 * /api/v1/watch/{id}:
 *   get:
 *     summary: Obtener un reloj por su ID
 *     tags: [Watches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reloj
 *     responses:
 *       200:
 *         description: Reloj encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
watchRouter.get('/:id', validateId, controller.getOneWatch);

/**
 * @swagger
 * /api/v1/watch:
 *   post:
 *     summary: Crear un nuevo reloj (Solo Admin)
 *     tags: [Watches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Reloj creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
watchRouter.post('/', verifyToken, onlyAdmin, validateSchema(postWatchSchema), controller.createNewWatch);

/**
 * @swagger
 * /api/v1/watch/{id}:
 *   put:
 *     summary: Actualizar un reloj (Completo - Solo Admin)
 *     tags: [Watches]
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
 *         description: Reloj actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
watchRouter.put('/:id', verifyToken, onlyAdmin, validateId, validateSchema(updateWatchSchema), controller.updateOneWatch);

/**
 * @swagger
 * /api/v1/watch/{id}:
 *   patch:
 *     summary: Actualizar campos específicos (Solo Admin)
 *     tags: [Watches]
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
 *         description: Reloj actualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
watchRouter.patch('/:id', verifyToken, onlyAdmin, validateId, validateSchema(updateWatchSchema), controller.updateOneWatch);

/**
 * @swagger
 * /api/v1/watch/{id}:
 *   delete:
 *     summary: Eliminar un reloj (Solo Admin)
 *     tags: [Watches]
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
 *         description: Reloj eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
watchRouter.delete('/:id', verifyToken, onlyAdmin, validateId, controller.deleteWatch);

module.exports = watchRouter;
