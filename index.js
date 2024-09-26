const express = require('express');
const cors = require('cors');
const rutasUsuarios = require('./rutas/rutasUsuarios');
const rutasProductos = require('./rutas/rutasProductos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS (permite peticiones desde otros dominios)
app.use(cors());

// Middleware para leer JSON en las solicitudes
app.use(express.json());

// Rutas de usuarios
app.use('/usuarios', rutasUsuarios);

// Rutas de productos (con Firestore)
app.use('/productos', rutasProductos);

// Middleware para manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});

// Iniciar el servidor en el puerto configurado o el 3000 por defecto
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
