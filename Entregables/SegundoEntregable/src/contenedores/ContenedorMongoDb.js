const mongoose = require ("mongoose");
const config=require("../config.js");

mongoose.set('strictQuery', true);

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongo{
    constructor(nombreCollection,esquema){
        this.collection=mongoose.model(nombreCollection,esquema);
    }
// ----------------------PRODUCTOS----------------------------------
    async listar(id){
        console.log('Lectura del producto según id');
        const resultado=this.collection.findById(mongoose.Types.ObjectId(id));
        return resultado;
    }

    async listarTodos(){
        console.log('Lectura de los productos');
        const resultado=this.collection.find({});
        return resultado;
    }

    async guardar(nuevoElem){
        console.log('Inserción');
        const resultado=this.collection.create(nuevoElem);
        return resultado;
    }

    async actualizarProducto(id,nuevaInfo){
        console.log('Actualizar Producto');
        const result= await this.collection.findOneAndUpdate({id:mongoose.Types.ObjectId(id)},nuevaInfo,{new:true});
        return result;
    }

    async borrarProducto(id){
        console.log('Eliminar Producto');
        const result=await this.collection.findOneAndDelete(mongoose.Types.ObjectId(id))
        return result;
    }

    // ----------------------CARRITO----------------------------------

    async agregarProductoCarrito(id,nuevoElem){
        console.log('Lectura del producto según el id del carrito');
        const resultado=await this.collection.updateOne({ _id: mongoose.Types.ObjectId(id) },{ $push: { productos: nuevoElem }});
        return resultado;
    }

    async mostrarProductosCarrito(id){
        const resultado=await this.collection.findById(mongoose.Types.ObjectId(id),{productos:1})
        return resultado;
    }

    async eliminarProductoCarrito(id,id_prod){
        const resultado=await this.collection.updateOne(
            { _id: mongoose.Types.ObjectId(id) },
            { $pull: { productos: { _id: mongoose.Types.ObjectId(id_prod)}}});
        return resultado;
    }
}

module.exports=ContenedorMongo