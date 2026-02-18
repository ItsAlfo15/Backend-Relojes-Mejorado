const { z } = require("zod");

z.config(z.locales.es());

const queryWatchSchema = z.object({
    marca: z.string().optional(),
    
    modelo: z.string().optional(),
    
    orderBy: z.enum(["asc", "desc"]).optional().default("desc"),

    page: z.preprocess((p) => parseInt(p, 10), 
        z.number().int().min(1, "La página debe ser al menos 1")
    ).optional().default(1),

    limit: z.preprocess((l) => parseInt(l, 10), 
        z.number().int().min(1, "El límite debe ser positivo").max(24, "No se puede pedir más 24 relojes por página")
    ).optional().default(10)
}).strict();

module.exports = queryWatchSchema;