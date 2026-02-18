# ⌚ Watch Store API – Backend Relojes de Lujo

API REST desarrollada con **Node.js y Express**, conectada a **Firebase Firestore**, que permite la gestión de un catálogo de relojes de lujo e incluye un sistema completo de autenticación con JWT.

---

## Requisitos Previos

- Node.js
- Cuenta en Firebase con un proyecto activo en **Firestore Database**
- Archivo de credenciales `firebase-key.json`

---

## Instalación y Configuración en Local

### 1. Clonar el repositorio

Primero debes navegar al directorio en el que quieres que se clone el proyecto, luego debes introducir este comando en la terminal:

`git clone https://github.com/tu-usuario/Proyecto_Alfonso_Backend_Relojes.git`


Una vez clonado escribe esto en la terminal:


`cd Proyecto_Alfonso_Backend_Relojes/`

### 2. Instalar dependencias

Debes introducir el siguiente comando en la terminal:

`npm install`

### 3. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Este paso es obligatorio para gestionar las credenciales sensibles de forma segura:

PORT=tu_puerto

FIREBASE_KEY_PATH=./firebase-key.json

JWT_EXPIRATION=24h

JWT_COOKIE_EXPIRES=1

SECRET_JWT_SEED=tu_clave_secreta_aqui

### 4. Configuración de Firebase

Debes seguir estos pasos:

 1º Accede a la Consola de Firebase
 
 2º Ve a Configuración del proyecto → Cuentas de servicio
 
 3º Seleccionar **Node.js** y pulsar en **"Generar nueva clave privada"**
 
 4º Renombra el archivo a **firebase-key.json**
 
 5º Colócalo en la raíz del proyecto

### 5. Carga de datos

Puedes cargar datos de prueba ejecutando el script **"migrate.js"** usando el siguiente comando:

`node migrate.js`

Esto cargará una base de datos almacenada en el proyecto y se subirá a tu firebase, ten en cuenta que el nombre de tu colección deberá coincidir con el del script

### 6. Ejecutar el Proyecto

Debes introducir el siguiente comando en la terminal:

`npm start`

o 

`npm run dev`

url para servidor local: http://localhost:tu_puerto

---

## Despliegue

El backend está desplegado en Render, se puede acceder a él clicanco el siguiente enlace:

https://alfonso-backend-relojes.onrender.com/api/v1/watch

La documentación de los endpoints está echa en Swagger, clicando en el siguiente enlace puedes acceder a ella:

https://alfonso-backend-relojes.onrender.com/api-docs

## Características técnicas

CRUD completo con verbos GET, POST, PUT, PATCH, DELETE

## Paginación y filtros

Paginación, límite y filtrado por marca, modelo y ordenamiento por fecha de registro

## Seguridad

- Autenticación mediante JWT
- Encriptación de contraseñas con bcrypt
- Protección de rutas para administrador
- CORS

## Validación de datos

Uso de esquemas de validación con Zod para validar entradas de datos

## Gestión de imágenes

Fotos de perfil por defecto e imágenes para los relojes

### -- Alfonso Álvarez Ocaña --

## Muchas Gracias


