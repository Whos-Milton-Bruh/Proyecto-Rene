const express = require("express");
const router = express.Router();
const { mostrarProductos, nuevoProducto, borrarProducto, buscarProductoPorId } = require("../bd/productosBD");

// Mostrar todos los productos
router.get("/", async (req, res) => {
    try {
        const productos = await mostrarProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los productos', error });
    }
});

// Buscar producto por ID
router.get("/buscarPorId/:id", async (req, res) => {
    try {
        const producto = await buscarProductoPorId(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar el producto', error });
    }
});

// Borrar producto por ID
router.delete("/borrarProducto/:id", async (req, res) => {
    try {
        const resultado = await borrarProducto(req.params.id);
        if (resultado.mensaje === 'Producto no encontrado') {
            return res.status(404).json(resultado);
        }
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al borrar el producto', error });
    }
});

// Agregar un nuevo producto
router.post("/nuevoProducto", async (req, res) => {
    try {
        const { nombre, precio, descripcion } = req.body;

        // Validación de campos requeridos
        if (!nombre || !precio) {
            return res.status(400).json({ mensaje: 'El nombre y el precio son obligatorios' });
        }

        const nuevoProductoData = {
            nombre,
            precio,
            descripcion: descripcion || '', // Descripción opcional
        };

        const productoCreado = await nuevoProducto(nuevoProductoData);
        res.status(201).json(productoCreado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el producto', error });
    }
});

module.exports = router;
