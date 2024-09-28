const express = require('express');
const ruta = express.Router();
const { usuarios } = require('../bd/conexion'); // Asegúrate de que la conexión a Firebase esté correcta

// Buscar un usuario por ID
ruta.get('/:id', async (req, res) => {
    try {
        const usuarioId = req.params.id;  // Captura el parámetro 'id' de la URL
        const usuarioDoc = await usuarios.doc(usuarioId).get();

        if (!usuarioDoc.exists) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(usuarioDoc.data());
    } catch (error) {
        console.error("Error buscando usuario por ID:", error);
        res.status(500).json({ error: "Error al buscar usuario" });
    }
});

module.exports = ruta;