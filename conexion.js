const admin = require('firebase-admin');
const keys = require('../keys.json'); // Ruta correcta a tu archivo de claves JSON

admin.initializeApp({
    credential: admin.credential.cert(keys)
});

const bd = admin.firestore();
const productos = bd.collection('productosmilton'); // Asegúrate de que la colección sea la correcta

module.exports = {
    productos // Exportamos la colección de productos
};