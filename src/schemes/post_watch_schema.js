const { z } = require("zod");

z.config(z.locales.es());

const postWatchSchema = z.object({

    marca: z.string().min(1, 'marca: no puede ser un campo vacío'),
    modelo: z.string().min(1, 'modelo: no puede ser un campo vacío'),
    referencia: z.string().min(1, 'referencia: no puede ser un campo vacío'),
    descripcion_resumida: z.string().min(1, 'descripcion_resumida: no puede ser un campo vacío'),

    estado: z.object({
            tipo: z.string().min(1, 'tipo: no puede ser un campo vacío'),
            descripcion_estado: z.string().min(1, 'descripcion_estado: no puede ser un campo vacío'),
    }),

    disponibilidad: z.boolean({
        required_error: 'La disponibilidad no puede ser un campo vacío',
        invalid_type_error: 'Disponibilidad debe ser un campo booleano'
    }),

    precio: z.number().positive("El precio debe ser mayor a 0"),

    anio_fabricacion: z.number()
        .int("El año debe ser un número entero")
        .min(1900, "El año es demasiado antiguo")
        .max(new Date().getFullYear(), "El año no puede ser futuro"),

    tiene_caja: z.boolean({
        required_error: 'El campo tiene_caja no puede ser un campo vacío',
        invalid_type_error: 'El campo tiene_caja debe ser un campo booleano'
    }),

    tiene_papeles: z.boolean({
        required_error: 'El campo tiene_papeles no puede ser un campo vacío',
        invalid_type_error: 'El campo tiene_papeles debe ser un campo booleano'
    }),

    valoracion: z.number()
        .min(0, "Mínimo 0")
        .max(5, "Máximo 5"),

    imagenes: z.array(z.string()).min(1, 'imagenes: debe contener al menos una entrada'),

    informacion_general: z.object({
            categoria: z.string().min(1, 'categoria: no puede ser un campo vacío'),
            genero: z.string().min(1, 'genero: no puede ser un campo vacío'),
            ubicacion: z.string().min(1, 'ubicacion: no puede ser un campo vacío'),
    }),

    calibre: z.object({
            tipo_calibre: z.string().min(1, 'tipo_calibre: no puede ser un campo vacío'),
            cod_calibre: z.string().min(1).nullable(),
            reserva_marcha: z.number('reserva_marcha: debe ser un número').nullable(),
    }),

    caja: z.object({
            material: z.string().min(1, 'material: no puede ser un campo vacío'),
            diametro: z.number()
                .min(10, 'diametro: mínimo de 10')
                .max(50, 'diametro: máximo de 50'),
            resistencia_agua: z.string().min(1, 'resistencia_agua: no puede ser un campo vacío').nullable().optional(),
            material_bisel: z.string().min(1, 'material_bisel: no puede ser un campo vacío'),
            cristal: z.string().min(1, 'cristal: no puede ser un campo vacío'),
            esfera: z.string().min(1, 'esfera: no puede ser un campo vacío'),
            tipo_numeros: z.string().min(1, 'tipo_numeros: no puede ser un campo vacío'),
    }),

    pulsera: z.object({
            material_pulsera: z.string().min(1, 'material_pulsera: no puede ser un campo vacío'),
            color: z.string().min(1, 'color: no puede ser un campo vacío'),
            cierre: z.string().min(1, 'cierre: no puede ser un campo vacío'),
            material_cierre: z.string().min(1, 'material_cierre: no puede ser un campo vacío'),
    }),

    descripcion: z.string().min(1, 'descripcion: no puede ser un campo vacío'),
}).strict();

module.exports = postWatchSchema;