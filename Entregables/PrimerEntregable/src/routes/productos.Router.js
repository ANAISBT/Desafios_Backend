const express=require('express')

const {Router} =express;

const productosRouter = new Router();

//importtamos la clase Container
 
const ContenedorArchivo=require('../contenedores/ContenedorArchivo')
//instancia la clase contenedor
const ProductoService=new ContenedorArchivo("./AQUI VA LA RUTA DEL ARCHIVO")

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
    console.log("Esta es una petición simple");

})

productosRouter.get('/:id',async(req,res)=>{
    //logica
    
    res.json()
    })

productosRouter.post('/',soloAdmins,async(req,res)=>{
        //logica
        
    res.json()
})

productosRouter.put('/:id',soloAdmins,async(req,res)=>{
    //logica
    
    res.json()
    })

productosRouter.delete('/:id',soloAdmins,async(req,res)=>{
    //logica
    
    res.json()
    })

module.exports= productosRouter

