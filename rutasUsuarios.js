const express = require('express');
const { usuarios } = require('../bd/conexion'); // Asegúrate de tener bien exportada la conexión y la colección
const ruta = express.Router();

// Mostrar todos los usuarios
ruta.get('/mostrarUsuarios', async (req, res) => {
    try {
        const snapshot = await usuarios.get();
        if (snapshot.empty) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        let usuariosArray = [];
        snapshot.forEach(doc => {
            usuariosArray.push({ id: doc.id, ...doc.data() });
        });

        res.json(usuariosArray);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

// Buscar usuario por ID
ruta.get('/buscarPorId/:id', async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const usuarioDoc = await usuarios.doc(idUsuario).get();
        if (!usuarioDoc.exists) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ id: usuarioDoc.id, ...usuarioDoc.data() });
    } catch (error) {
        console.error("Error al buscar usuario por ID:", error);
        res.status(500).json({ error: "Error al buscar usuario" });
    }
});

// Crear un nuevo usuario
ruta.post('/', async (req, res) => {
    console.log("Datos recibidos para crear usuario:", req.body);
    const { nombre, usuario, password } = req.body;

    if (!nombre || !usuario || !password) {
        console.log("Faltan campos obligatorios");
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        const nuevoUsuario = { nombre, usuario, password };
        const usuarioRef = await usuarios.add(nuevoUsuario);
        console.log("Usuario creado con ID:", usuarioRef.id);
        res.json({ id: usuarioRef.id, ...nuevoUsuario });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ error: "Error al crear usuario" });
    }
});

// Eliminar usuario por ID
ruta.delete('/borrarUsuario/:id', async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const usuarioDoc = await usuarios.doc(idUsuario).get();
        if (!usuarioDoc.exists) {
            return res.status(404).json({ error: "Usuario no encontrado para eliminar" });
        }

        await usuarios.doc(idUsuario).delete();
        console.log("Usuario eliminado con éxito:", idUsuario);
        res.json({ mensaje: "Usuario eliminado con éxito", id: idUsuario });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
});

module.exports = ruta;