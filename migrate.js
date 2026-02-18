const admin = require('firebase-admin')
const serviceAccount = require("./firebase-key.json")
const dbData = require("./src/databases/database.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const migrate = async () => {
    console.log('Migranado base de datos...')

    // Data de prueba
    const watches = dbData.relojes

    // Apunto a la coleccion de watches
    const collection = db.collection("watches")

    // Recorro la coleccion
    for (const watch of watches) {
        try {
            // Desectructuro el id y me quedo con la data del reloj
            const { id, ...watchData } = watch

            // Modifico la fecha de registro
            const doc = await collection.add({
                ...watchData,
                fecha_registro: new Date(watchData.fecha_registro).toISOString()
            })

            console.log('Reloj añadido correctamente: ', doc.id)

        } catch {
            console.log('Hubo un error al añadir el reloj')
        }
    }

    console.log('Migración finalizada')
    // Finalizo el proceso
    process.exit()
}

migrate()