const mongoose = require("mongoose");

const config = require("../config.js");

 mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDbCarrito {

    constructor(nombreColeccion, esquema) {
        // this.nombreColeccion=nombreColeccion;
        // this.esquema=esquema;
        // const collection = mongoose.model(this.nombreColeccion, this.esquema)
        this.collection=mongoose.model(nombreColeccion, esquema)
    }

    async crearColeccion(res,data){
        try{
            console.log("Crear de elementos");
            const result=await this.collection.create(data);
            return res.status(200).send(result);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }
    async listarProductosDeUnCarrito(res,id) {
        try{
            console.log("Lectura de productos de un carrito");
            const result=await this.collection.find({id:id},{productos:1});
            return res.status(200).send(result);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }


    async guardar(res,id,nuevoElem) {
        try{
            console.log("Insertó un elementos");
            const result=await this.collection.find({id:id}).create(nuevoElem);
            return res.status(200).send(result);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async agregarProducto(res,id,nuevoElem){
        try {
            const result=await this.collection.find({id:id},{$push: {productos:nuevoElem}},{new:true})
            return res.status(200).send(result);
        } catch (err) {
            res.status(500).send({err:`Ocurrio un error : ${err.message}`}) 
        }
    }

    async actualizar(res,id,nuevoElem) {
        try{
            console.log("Actualizó los datos");
            const result= await this.collection.findOneAndUpdate({id:id},nuevoElem,{new:true});
            return res.status(200).send(result);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async borrarProducto(res,id,id_prod) {
        try {
            const result=await this.collection.find({id:id},{$pull: {productos:{id:id_prod}}},{new:true})
            return res.status(200).send(result);
        } catch (err) {
            res.status(500).send({err:`Ocurrio un error : ${err.message}`}) 
        }
    }

}

module.exports= ContenedorMongoDbCarrito