const { productos } = require('./conexion');  // Cambia firebase por conexiones

// Mostrar todos los productos
async function mostrarProductos() {
    const productosSnapshot = await productos.get();
    const productosList = [];
    productosSnapshot.forEach(doc => {
        productosList.push({ id: doc.id, ...doc.data() });
    });
    return productosList;
}

// Buscar producto por ID
async function buscarProductoPorId(id) {
    const productoDoc = await productos.doc(id).get();
    if (!productoDoc.exists) {
        return null;
    }
    return { id: productoDoc.id, ...productoDoc.data() };
}

// Agregar un nuevo producto
async function nuevoProducto(producto) {
    const nuevoDoc = await productos.add(producto);
    return { id: nuevoDoc.id, ...producto };
}

// Borrar un producto por ID
async function borrarProducto(id) {
    const productoDoc = await productos.doc(id).get();
    if (!productoDoc.exists) {
        return { mensaje: 'Producto no encontrado' };
    }
    await productos.doc(id).delete();
    return { mensaje: 'Producto borrado correctamente' };
}

module.exports = { mostrarProductos, buscarProductoPorId, nuevoProducto, borrarProducto };