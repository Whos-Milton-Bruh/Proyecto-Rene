const { productos } = require('./conexion');  // Cambia firebase por conexiones

// Mostrar todos los productos
async function mostrarProductos() {
    try {
        const productosSnapshot = await productos.get();
        const listaProductos = [];
        productosSnapshot.forEach(doc => {
            listaProductos.push({ id: doc.id, ...doc.data() });
        });
        return listaProductos;
    } catch (error) {
        console.error('Error al mostrar productos:', error);
        throw new Error('Error al obtener productos');
    }
}

// Buscar producto por ID
async function buscarProductoPorId(id) {
    try {
        const productoDoc = await productos.doc(id).get();
        if (!productoDoc.exists) {
            return { mensaje: 'Producto no encontrado' };
        }
        return { id: productoDoc.id, ...productoDoc.data() };
    } catch (error) {
        console.error('Error al buscar producto por ID:', error);
        throw new Error('Error al buscar el producto');
    }
}

// Agregar un nuevo producto
async function nuevoProducto(producto) {
    try {
        if (!producto.nombre || !producto.precio) {
            return { mensaje: 'El nombre y el precio son obligatorios' };
        }

        const nuevoDoc = await productos.add(producto);
        return { id: nuevoDoc.id, ...producto };
    } catch (error) {
        console.error('Error al agregar nuevo producto:', error);
        throw new Error('Error al agregar producto');
    }
}

// Borrar un producto por ID
async function borrarProducto(id) {
    try {
        const productoDoc = await productos.doc(id).get();
        if (!productoDoc.exists) {
            return { mensaje: 'Producto no encontrado' };
        }
        await productos.doc(id).delete();
        return { mensaje: 'Producto borrado correctamente' };
    } catch (error) {
        console.error('Error al borrar producto:', error);
        throw new Error('Error al borrar producto');
    }
}

module.exports = { mostrarProductos, buscarProductoPorId, nuevoProducto, borrarProducto };
