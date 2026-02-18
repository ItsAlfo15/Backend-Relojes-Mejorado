const { da } = require('zod/locales');
const watchService = require('../services/watch_service');

// Devolver todos los relojes
const getAllWatches = async (req, res) => {
    try {
        // Recojo los parametros de la query
        const { modelo, marca, orderBy, page, limit } = req.query;

        const { total, currentPage, totalPages, perPage, data } =
            await watchService.getAllWatches({ modelo, marca, orderBy, page, limit });

        // Devuelvo los datos
        res.status(200).json({
            status: "OK",
            total,
            currentPage,
            totalPages,
            perPage,
            data
        });

    } catch (error) {
        // Devuelvo error
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        })
    }
}

// Devolver un solo reloj
const getOneWatch = async (req, res) => {
    // Recojo los parametros de la query
    const { params: { id } } = req;

    try {
        const watch = await watchService.getOneWatch(id);

        // Devuelvo los datos
        res.send({
            status: "OK",
            data: watch
        })

    } catch (error) {
        // Devuelvo error
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        })
    }
}

// Crear un reloj
const createNewWatch = async (req, res) => {
    try {
        // Recojo el body de la query
        const { body } = req;

        const createdWatch = await watchService.createNewWatch(body);

        // Devuelvo los datos
        res.status(201).send({
            status: "OK",
            message: "Reloj creado correctamente",
            data: createdWatch
        });

    } catch (error) {
        // Devuelvo error
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        })
    }
}

// Actualizar un reloj
const updateOneWatch = async (req, res) => {
    // Recojo los parametros y el body de la query
    const { body, params: { id } } = req;

    try {
        const updatedWatch = await watchService.updateOneWatch(id, body);

        // Devuelvo los datos
        res.status(200).send({
            status: "OK",
            message: "Reloj actualizado correctamente",
            data: updatedWatch
        });

    } catch (error) {
        // Devuelvo error
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error.message || error }
        });
    }
}

// Eliminar un reloj
const deleteWatch = async (req, res) => {
    const { params: { id } } = req;

    try {
        await watchService.deleteOneWatch(id);

        // Al devolver status 204 no me permite enviar un mensaje,
        // ya que es la funcionalidad de este estado
        //return res.status(204).send()

        // Devuelvo los datos
        return res.status(200).send({
            status: "OK",
            message: 'Reloj borrado correctamente'
        });

    } catch (error) {
        // Devuelvo error
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: { message: error?.message || error } }
        })
    }
}

module.exports = {
    getAllWatches,
    getOneWatch,
    createNewWatch,
    updateOneWatch,
    deleteWatch,
}