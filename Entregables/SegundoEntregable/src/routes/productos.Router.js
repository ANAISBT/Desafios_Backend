const express=require('express')

const {Router} =express;

const productosRouter = new Router();

//importtamos la clase Container
 
const ContenedorArchivo=require('../contenedores/ContenedorArchivo')
//instancia la clase contenedor
const ProductoService=new ContenedorArchivo('./db/dbProductos.json')

const ContenedorMongoDb=require('../contenedores/ContenedorMongoDb.js');
//const { productosDao } = require('../daos');

const ProductoDaoMongo=new ContenedorMongoDb('productos', {
    id:{ type: Number, required: true },
        nombre:{ type: String, required: true },
        timestamp:{ type: String, required: true },
        descipcion:{ type: String, required: true },
        codigo: { type: Number, required: true } ,
        fotoUrl:{ type: String, required: true } ,
        precio:{ type: Number, required: true },
        stock:{ type: Number, required: true }
});

const ContenedorFirebase=require('../contenedores/ContenedorFirebase.js');

const ProductoDaoFirebase=new ContenedorFirebase('productos');

//Función de Error

const crearErrorNoEsAdmin =(ruta,metodo)=>{
    const error={
        error:-1,
    }
    if(ruta && metodo){
        error.description=`ruta ${ruta} metodo ${metodo} no autorizada`
    }else{
        error.description='NO AUTORIZADO'
    }
    return error
}

//Middleware para permiso de Administrador

const esAdmin=true;
const soloAdmins=(req,res,next)=>{
    if(!esAdmin){
        res.json(crearErrorNoEsAdmin(req.url,req.method))
    }else{
        next()
    }
}


//Endpoints
productosRouter.get('/',async(req,res)=>{
//logica

//  ProductoService.listarTodos(res);
  ProductoDaoMongo.listarAll(res);
// ProductoDaoFirebase.listarAll(res);
})

productosRouter.get('/:id',async(req,res)=>{
    //logica
    const { id } = req.params;

    // ProductoService.listar(res,id);
    ProductoDaoMongo.listar(res,id);
    })

productosRouter.post('/',soloAdmins,async(req,res)=>{
        //logica

    // ProductoService.guardar(res,req.body);
    ProductoDaoMongo.guardar(res,req.body);
})

productosRouter.put('/:id',soloAdmins,async(req,res)=>{
    //logica
    
    const { id } = req.params;

    // ProductoService.actualizar(id,res,req.body);
    ProductoDaoMongo.actualizar(res,id,req.body);
    })

    productosRouter.put('/',soloAdmins,async(req,res)=>{
        //logica
        
        ProductoDaoMongo.crear(res,req.body);        })   
    
productosRouter.delete('/:id',soloAdmins,async(req,res)=>{
    //logica
    const { id } = req.params;

    // ProductoService.borrar(id,res);
    ProductoDaoMongo.borrar(res,id);
    })

module.exports= productosRouter

