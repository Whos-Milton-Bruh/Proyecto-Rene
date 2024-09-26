var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarProductoPorId } = require("../bd/productosBD");

// Mostrar todos los productos
ruta.get("/", async (req, res) => {
    const productos = await mostrarProductos();
    res.json(productos);
});

// Buscar producto por ID
ruta.get("/buscarPorId/:id", async (req, res) => {
    var productoValido = await buscarProductoPorId(req.params.id);
    if (!productoValido) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json(productoValido);
});

// Borrar producto por ID
ruta.delete("/borrarProducto/:id", async (req, res) => {
    var productoBorrado = await borrarProducto(req.params.id);
    if (productoBorrado.mensaje === 'Producto no encontrado') {
        return res.status(404).json(productoBorrado);
    }
    res.json(productoBorrado);
});

// Agregar un nuevo producto
ruta.post("/nuevoProducto", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

module.exports = ruta;
