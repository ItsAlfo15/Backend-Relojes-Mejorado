const { z } = require("zod");

// Regex estándar para emails
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Esquema para Registro
const registerSchema = z.object({
    name: z.string().min(1, "name: El nombre es obligatorio"),
    email: z.string().min(1).regex(emailRegex, "email: Formato de email inválido"),
    password: z.string().min(8, "password: La contraseña debe tener al menos 8 caracteres")
}).strict();

// Esquema para Login
const loginSchema = z.object({
    email: z.string().min(1).regex(emailRegex ,"email: Formato de email inválido"),
    password: z.string().min(1, "password: La contraseña es obligatoria") 
}).strict();

module.exports = { registerSchema, loginSchema };