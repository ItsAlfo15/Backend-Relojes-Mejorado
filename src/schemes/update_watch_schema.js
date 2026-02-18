const postWatchSchema = require('./post_watch_schema');

const { caja, estado, calibre, pulsera, informacion_general } = postWatchSchema.shape

// partial vuelve los campos opcionales
const updateWatchSchema = postWatchSchema.extend({
    caja: caja.partial().optional(),
    estado: estado.partial().optional(),
    calibre: calibre.partial().optional(),
    pulsera: pulsera.partial().optional(),
    informacion_general: informacion_general.partial().optional(),
}).partial().strict()

module.exports = updateWatchSchema;