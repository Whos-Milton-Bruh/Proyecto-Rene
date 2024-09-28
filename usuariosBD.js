const { usuarios } = require('./conexion');  // Asegúrate de que las conexiones están bien definidas

// Mostrar todos los usuarios (filtrando por aquellos que tienen el tipo "usuario")
async function mostrarUsuarios() {
    const usuariosSnapshot = await usuarios.get();  // Elimina el filtro para obtener todos los documentos
    const usuariosList = [];
    usuariosSnapshot.forEach(doc => {
        usuariosList.push({ id: doc.id, ...doc.data() });
    });
    return usuariosList;
}

// Buscar un usuario por ID
async function buscarUsuarioPorId(id) {
    const usuarioDoc = await usuarios.doc(id).get();
    if (!usuarioDoc.exists) {  // Eliminamos la condición de "tipo"
        return null;
    }
    return { id: usuarioDoc.id, ...usuarioDoc.data() };
}

// Agregar un nuevo usuario como un nuevo documento en la colección "usuarios"
async function nuevoUsuario(usuario) {
    usuario.tipo = 'usuario';  // Agregamos el campo para distinguir usuarios de productos
    const nuevoDoc = await usuarios.add(usuario);
    return { id: nuevoDoc.id, ...usuario };
}

// Borrar un usuario por ID (solo si es un "usuario")
async function borrarUsuario(id) {
    const usuarioDoc = await usuarios.doc(id).get();
    if (!usuarioDoc.exists) {  // Elimina la condición de tipo
        return { mensaje: 'Usuario no encontrado' };
    }
    await usuarios.doc(id).delete();
    return { mensaje: 'Usuario borrado correctamente' };
}

module.exports = { mostrarUsuarios, buscarUsuarioPorId, nuevoUsuario, borrarUsuario };