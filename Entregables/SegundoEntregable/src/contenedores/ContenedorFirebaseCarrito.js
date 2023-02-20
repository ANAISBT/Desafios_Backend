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


    async listar(res,id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (doc.exists) {
              const productos = doc.data().productos;
              res.send({ success: true, data: productos });
            } else {
              res.status(404).send({ err: `El documento con el id ${id} no existe` });
            }
          } catch (err) {
            res.status(500).send({ err: `Ocurrió un error: ${err.message}` });
          }

    }

    async listarAll(res) {
        try {
            const productos = await this.coleccion.get();
            const result = [];
            // Iterar sobre los documentos y agregar los datos a un array
            productos.forEach((doc) => {
              result.push({ id: doc.id, ...doc.data() });
            });
            // Devolver un objeto JSON con el array de datos
            res.send({ success: true, data: result });
          } catch (err) {
            res.status(500).send({ err: `Ocurrió un error: ${err.message}` });
          }
    }

    async guardar(res,nuevoElem) {
        try{
            const producto=await this.coleccion.add(nuevoElem);
            res.send({ success: true, data: producto.id });
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async agregarProducto(res,id,nuevoElem) {
        try{
            const producto=await this.coleccion.doc(id).update({
                productos:admin.firestore.FieldValue.arrayUnion(nuevoElem),
            }).get();
            res.send({ success: true, data: producto.id });
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async actualizar(res,id,nuevoElem) {
         try{
            const producto=await this.coleccion.doc(id).update(nuevoElem);
            res.send({ success: true, data: producto });
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async borrarProducto(res,id,id_prod) {
        try {
            const producto = await this.coleccion.doc(id).update({
              productos: admin.firestore.FieldValue.arrayRemove(id_prod),
            });
            res.send({ success: true, data: producto });
          } catch (err) {
            res.status(500).send({ err: `Ocurrió un error: ${err.message}` });
          }
    }

}

module.exports=ContenedorFirebase