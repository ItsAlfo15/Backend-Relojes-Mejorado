// Importo el SDK que me permite conectarme a firebase
const admin = require('firebase-admin')
const path = require('path');

require('dotenv').config();

let DB;

try {

    // Importo la firebase key
    const keyName = process.env.FIREBASE_KEY_PATH || 'firebase-key.json';

    // Busco el archivo
    const keyPath = path.resolve(process.cwd(), keyName);

    // Genero el servicio
    const serviceAccount = require(keyPath);

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    DB = admin.firestore()

    //console.log("Conexion con firebase realizada correctamente");
} catch (error) {
    console.log(error.message)
    process.exit(1);
}

module.exports = { admin, DB };

