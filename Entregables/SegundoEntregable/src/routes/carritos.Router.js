const express=require('express')
const mongoose = require("mongoose");
const {Router} =express;

const carritosRouter = new Router();
 
const ContenedorArchivoCarrito=require('../contenedores/ContenedorArchivoCarrito')
const CarritoService=new ContenedorArchivoCarrito('./db/dbCarritos.json')
const ContenedorMongo = require("../contenedores/ContenedorMongoDB");

//Carrito Dao Mongo

const carritosSquema=new mongoose.Schema({
    productos:{type:Array,required:true}
},{ timestamps: true });

const CarritoDAOMongo=new ContenedorMongo('carritos',carritosSquema);

//Carrito DAO Firebase

const ContenedorFirebase=require('../contenedores/ContenedorFirebase.js');
const CarritoDaoFirebase=new ContenedorFirebase('carritos');


carritosRouter.post('/:id/productos',async(req,res)=>{
    
const {id}=req.params;
// CarritoService.agregarProducto(res,id);
try {
    // const productos=await CarritoDAOMongo.agregarProductoCarrito(id,req.body);
    const productos=await CarritoDaoFirebase.agregarProductoCarrito(id,req.body)
    res.status(200).json(productos);
} catch (err) {
    res.status(500).send({err:`Ocurrio un error : ${err.message}`})
}
})

carritosRouter.get('/:id/productos',async(req,res)=>{
    const {id}=req.params;
    try {
        // const productos=await CarritoDAOMongo.mostrarProductosCarrito(id);
        const productos=await CarritoDaoFirebase.mostrarProductosCarrito(id);
        res.status(200).json(productos);
    } catch (err) {
        res.status(500).send({err:`Ocurrio un error : ${err.message}`})
    }
})

carritosRouter.get('/',async(req,res)=>{
    try {
        // const carritos=await CarritoDAOMongo.guardar(req.body);
        const carritos=await CarritoDaoFirebase.guardar(req.body);
        res.status(200).json(carritos);
    } catch (err) {
        res.status(500).send({err:`Ocurrio un error : ${err.message}`})
    }
})

carritosRouter.delete('/:id/productos/:id_prod',async(req,res)=>{
        const {id,id_prod}=req.params;
        // CarritoService.borrarProducto(res,id,id_prod);
        try {
            // const producto=await CarritoDAOMongo.eliminarProductoCarrito(id,id_prod);
            await CarritoDaoFirebase.eliminarProductoCarrito(id,id_prod)
            res.status(200).json('Eliminado');
        } catch (err) {
            res.status(500).send({err:`Ocurrio un error : ${err.message}`})
        }
})
module.exports= carritosRouter

