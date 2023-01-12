const express=require('express')

const {Router} =express;

const productosRouter = new Router();

//importtamos la clase Container
 
const ContenedorArchivo=require('../contenedores/ContenedorArchivo')
//instancia la clase contenedor
const ProductoService=new ContenedorArchivo("http://localhost:8080/api/productos")

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

ProductoService.listarTodos(res);

})

productosRouter.get('/:id',async(req,res)=>{
    //logica
    const { id } = req.params;

    ProductoService.listar(res,id);
    
    })

productosRouter.post('/',soloAdmins,async(req,res)=>{
        //logica

    ProductoService.guardar(res,req.body);
})

productosRouter.put('/:id',soloAdmins,async(req,res)=>{
    //logica
    
    const { id } = req.params;

    ProductoService.actualizar(id,res,req.body);
    })

productosRouter.delete('/:id',soloAdmins,async(req,res)=>{
    //logica
    const { id } = req.params;

    ProductoService.borrar(id,res);
    })

module.exports= productosRouter

