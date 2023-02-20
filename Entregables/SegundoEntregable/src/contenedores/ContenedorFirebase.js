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


    async listar(res,id) {
        try{
            const Producto=await this.collection.doc(id).get();
            res.send({ success: true, data: Producto.data() });
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }

    }

    async listarAll(res) {
        try{
            const productos=await this.collection.get();
            const result = [];
            // Iterar sobre los documentos y agregar los datos a un array
            productos.forEach((doc) => {
                result.push(doc.data());
            });
            // Devolver un objeto JSON con el array de datos
            res.send({ success: true, data: result });
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
        
    }

    async guardar(res,nuevoElem) {
        try{
            const producto=await this.collection.add(nuevoElem);
            res.send({ success: true, data: producto.id });
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async actualizar(res,id,nuevoElem) {
         try{
            const producto=await this.collection.doc(id).update(nuevoElem);
        res.send({ success: true, data: producto });
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async borrar(res,id) {
        try{
            const producto=await this.collection.doc(id).delete();
        res.send(producto);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

}

module.exports=ContenedorFirebase