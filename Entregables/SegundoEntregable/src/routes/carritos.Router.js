const express=require('express')

const {Router} =express;

const carritosRouter = new Router();

//importtamos la clase Container
 
const ContenedorArchivoCarrito=require('../contenedores/ContenedorArchivoCarrito')
//instancia la clase contenedor
const CarritoService=new ContenedorArchivoCarrito('./db/dbCarritos.json')

const ContenedorMongoDb=require('../contenedores/ContenedorMongoDBCarrito.js');

const CarritoDaoMongo=new ContenedorMongoDb('carritos', {
    id:{ type: Number, required: true },
    timestamp:{ type: String, required: true },
    productos:{type:Array,required:true}
});

const ContenedorFirebase=require('../contenedores/ContenedorFirebaseCarrito.js');

const CarritoDaoFirebase=new ContenedorFirebase('carritos');

//Endpoints

carritosRouter.post('/',async(req,res)=>{
    //logica
    
    // CarritoService.crearCarrito(res,req.body);
    CarritoDaoMongo.crearColeccion(res,req.body);
})

carritosRouter.post('/:id/productos',async(req,res)=>{
    
//logica
const {id}=req.params;
// CarritoService.agregarProducto(res,id);
CarritoDaoMongo.agregarProducto(res,id,req.body);
// CarritoDaoFirebase.agregarProducto(res,id,req.body);
})

carritosRouter.get('/:id/productos',async(req,res)=>{
    //logica
    const {id}=req.params;

// CarritoService.listarCarrito(res,id);
CarritoDaoMongo.listarProductosDeUnCarrito(res,id);
// CarritoDaoFirebase.listar(res,id);
    })

carritosRouter.delete('/:id/productos/:id_prod',async(req,res)=>{
        //logica
        const {id,id_prod}=req.params;
        // CarritoService.borrarProducto(res,id,id_prod);
        CarritoDaoMongo.borrarProducto(res,id,id_prod);
        //  CarritoDaoFirebase.borrar(res,id,id_prod);
    
})
module.exports= carritosRouter

