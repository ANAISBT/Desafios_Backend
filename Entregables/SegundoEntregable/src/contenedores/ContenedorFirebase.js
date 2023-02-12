const admin = require("firebase-admin");

const config = require('../config.js');

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL:'https://coder-house-backend-d006a.firebaseio.com'
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }


    async listar(id) {

    }

    async listarAll(res) {
        try{
            allProducts=await this.collection.get();
        res.send(allProducts);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
        
    }

    async guardar(res,nuevoElem) {
        try{
            const producto=await this.collection.add(nuevoElem);
        res.send(producto);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async actualizar(res,id,nuevoElem) {
         try{
            const producto=await this.collection.doc(id).update(nuevoElem);
        res.send(producto);
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

    async borrarAll() {

    }

    async desconectar() {
    }
}

module.exports=ContenedorFirebase