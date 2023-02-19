const mongoose = require("mongoose");

const config = require("../config.js");

 mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        // this.nombreColeccion=nombreColeccion;
        // this.esquema=esquema;
        // const collection = mongoose.model(this.nombreColeccion, this.esquema)
        this.collection=mongoose.model(nombreColeccion, esquema)
    }

    async crear(res,data){
        try{
            console.log("Crear de elementos");
            const result=await this.collection.create(data);
            return res.status(200).send(result);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }
    async listar(res,id) {
        try{
            console.log("Lectura de elementos");
            const result=await this.collection.find({id:id});
            return res.status(200).send(result);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async listarAll(res) {
        try{
            console.log("Lectura de elementos");
            const result=await this.collection.find({});
            return res.status(200).send(result);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

    async guardar(res,nuevoElem) {
        try{
            console.log("Insertó un elementos");
            
            const result= await this.collection.create(nuevoElem);
            return res.status(200).send(result);
        }catch(err){
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

    async borrar(res,id) {
        try{
            console.log("Eliminó los datos");
            const result= await this.collection.findOneAndDelete({id:id})
            return res.status(200).send(result);
        }catch(err){
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
    }

}

module.exports= ContenedorMongoDb