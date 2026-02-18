const { DB } = require('../config/firebase_config')
const collection = DB.collection('watches')

// Devolver todos los relojes
const getAllWatches = async (filterParams) => {

    try {
        // Me traigo la QuerySnapshot que es un contenedor 
        // con los metadatos de los documentos y una lista de estos
        const snapshot = await collection.get()

        // Recojo de la snapsot el id de cada documento y la data de su interior
        let watches = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        // Filtrado por marca
        if (filterParams.marca) {
            watches = watches.filter(watch => watch.marca.toLowerCase().includes(filterParams.marca.toLowerCase()))
        }

        // Filtrado por modelo
        if (filterParams.modelo) {
            watches = watches.filter(watch => watch.modelo.toLowerCase().includes(filterParams.modelo.toLowerCase()))
        }

        // Ordenacion por fecha de registro
        if (filterParams.orderBy) {
            if (filterParams.orderBy.toLowerCase() === 'asc') {
                watches = [...watches].sort(
                    (a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro)
                );
            } else if (filterParams.orderBy.toLowerCase() === 'desc') {
                watches = [...watches].sort(
                    (a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro)
                );
            }
        }

        // Me traigo el numero de la pagina y el 
        // limite de relojes que se mostraran por cada pagina
        const count = watches.length
        const page = parseInt(filterParams.page) || 1
        const limit = parseInt(filterParams.limit) || 5
        const totalPages = Math.ceil(count / limit)

        // Lanzo error si la pagina supera el total calculado
        if (page > totalPages) {
            throw {
                status: 400,
                message: `No se encontró la página, el límite es: ${totalPages}`
            };
        }

        // Calculo desde que indice traere los relojes
        const startIndex = (page - 1) * limit;
        const paginatedWatches = watches.slice(startIndex, startIndex + limit);

        // Retorno todos los datos
        return {
            total: count,
            currentPage: page,
            totalPages,
            perPage: limit,
            data: paginatedWatches
        };

    } catch (error) {
        // Lanzo error
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
}

// Devolver un solo reloj
const getOneWatch = async (watchId) => {

    try {
        // Me traigo el documento entero para verificar si existe
        const watch = await collection.doc(watchId).get()

        // En caso de que no existe devuelvo error
        if (!watch.exists) {
            throw {
                status: 404,
                message: `No se encontró un reloj con el id: ${watchId}`
            };
        }

        // Retorno un objeto con el id y los datos del reloj
        return { id: watch.id, ...watch.data() };

    } catch (error) {
        // Lanzo error
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
}

// Crear un reloj
const createNewWatch = async (watchToInsert) => {

    try {
        // Creo el nuevo reloj y le asigno las fechas 
        // y una array limpia en caso de error en las imagenes
        const watch = {
            ...watchToInsert,
            fecha_registro: new Date().toISOString(),
            fecha_modificacion: new Date().toISOString(),
            imagenes: watchToInsert.imagenes ?? [],
        }

        // Añado el reloj a la colecicon
        const newWatch = await collection.add(watch)

        // Retorno un objeto con el id y los datos del reloj
        return { id: newWatch.id, ...watch };

    } catch (error) {
        // Lanzo error
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
}

// Actualizar un reloj
const updateOneWatch = async (watchId, changes) => {

    try {
        // Recojo la referencia del reloj
        const watch = collection.doc(watchId)

        // Me traigo el documento
        const doc = await watch.get();

        // Lanzo error
        if (!doc.exists) {
            throw {
                status: 404,
                message: `No se encontró un reloj con el id: ${watchId}`
            };
        }

        // Extraigo la data del documento
        const currentData = doc.data();

        // Creo un reloj nuevo copiando los cambios pasados 
        // y acualizando la fecha de modificacion
        const updatedWatch = {
            ...currentData,
            ...changes,
            caja: {
                ...currentData.caja,
                ...(changes.caja || {})
            },
            estado: {
                ...currentData.estado,
                ...(changes.estado || {})
            },
            calibre: {
                ...currentData.calibre,
                ...(changes.calibre || {})
            },
            pulsera: {
                ...currentData.pulsera,
                ...(changes.pulsera || {})
            },
            informacion_general: {
                ...currentData.informacion_general,
                ...(changes.informacion_general || {})
            },
            fecha_modificacion: new Date().toISOString(),
        };

        // Actualizo el reloj
        await watch.update(updatedWatch)

        // Retorno un objeto con el id y los datos del reloj
        return { id: watchId, ...updatedWatch, fecha_modificacion: updatedWatch.fecha_modificacion };

    } catch (error) {
        // Lanzo error
        throw {
            status: error?.status || 500,
            message: error?.message || error
        };
    }
}

// Eliminar un reloj
const deleteOneWatch = async (watchId) => {

    try {
        // Recojo la referencia del reloj
        const watch = collection.doc(watchId)

        // Me traigo el documento entero para verificar si existe
        const snapshot = await watch.get();

        // En caso de que no existe devuelvo error
        if (!snapshot.exists) throw new Error();

        // Lo elimino
        await watch.delete()

        // Retorno true para indicar que la operacion se ha realizado con exito
        return true

    } catch (error) {
        // Lanzo error
        throw {
            status: 404,
            message: `No existe el reloj con id: ${watchId}`
        };
    }
}

module.exports = {
    getAllWatches,
    getOneWatch,
    createNewWatch,
    deleteOneWatch,
    updateOneWatch,
}