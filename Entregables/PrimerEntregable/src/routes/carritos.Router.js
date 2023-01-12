const express=require('express')

const {Router} =express;

const carritosRouter = new Router();

//importtamos la clase Container
 
const ContenedorArchivoCarrito=require('../contenedores/ContenedorArchivoCarrito')
//instancia la clase contenedor
const CarritoService=new ContenedorArchivoCarrito("./AQUI VA LA RUTA DEL ARCHIVO")


//Endpoints

carritosRouter.post('/',async(req,res)=>{
    //logica
    
    CarritoService.crearCarrito(res,req.body);

})

carritosRouter.post('/:id/productos',async(req,res)=>{
    
//logica
const {id}=req.params;
CarritoService.agregarProducto(res,id);
})

carritosRouter.get('/:id/productos',async(req,res)=>{
    //logica
    const {id}=req.params;

CarritoService.listarCarrito(res,id);
    })

carritosRouter.delete('/:id/productos/:id_prod',async(req,res)=>{
        //logica
        const {id,id_prod}=req.params;
        CarritoService.borrarProducto(res,id,id_prod);
    
})
module.exports= carritosRouter

