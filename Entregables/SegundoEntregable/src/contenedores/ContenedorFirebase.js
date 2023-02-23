const admin = require("firebase-admin");

const config = require('../config.js');

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL:'https://coder-house-backend-d006a.firebaseio.com'
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.colecction = db.collection(nombreColeccion)
    }

// ----------------------PRODUCTOS----------------------------------
async listar(id){
        const doc = await this.colecction.doc(id).get()
        if (doc.exists) {
            const producto = doc.data()
            producto.id = doc.id
            return producto
        } else {
            return null
        }
}

async listarTodos(){

    const productos = []
        const snapshot = await this.collection.get()
        snapshot.forEach(doc => {
            const producto = doc.data()
            producto.id = doc.id
            productos.push(producto)
        })
        return snapshot
}

async guardar(nuevoElem){
        const docRef = await this.colecction.add(nuevoElem)
        return docRef.id
    
}

async actualizarProducto(id,nuevaInfo){
        await this.colecction.doc(id).update(nuevaInfo)
}

async borrarProducto(id){
        await this.colecction.doc(id).delete()
}

// ----------------------CARRITO----------------------------------

async agregarProductoCarrito(id,nuevoElem){
        const docRef = await this.colecction.doc(id).update({
            productos: admin.firestore.FieldValue.arrayUnion(nuevoElem)
          })
        return docRef
}

async mostrarProductosCarrito(id){

        const snapshot = await this.colecction.doc(id).get()
        return snapshot.data()
}

async eliminarProductoCarrito(id,id_prod){

        await this.colecction.doc(id).update({
            productos: admin.firestore.FieldValue.arrayRemove(id_prod)
          })
}

}

module.exports=ContenedorFirebase