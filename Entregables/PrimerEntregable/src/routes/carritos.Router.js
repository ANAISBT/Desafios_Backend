const express=require('express')

const {Router} =express;

const carritosRouter = new Router();

//importtamos la clase Container
 
const ContenedorArchivo=require('../contenedores/ContenedorArchivo')
//instancia la clase contenedor
const CarritoService=new ContenedorArchivo("./AQUI VA LA RUTA DEL ARCHIVO")

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


//Endpoints

carritosRouter.post('/',async(req,res)=>{
    //logica
    
res.json()
})

carritosRouter.post('/:id/productos',async(req,res)=>{
//logica

res.json()
})

carritosRouter.get('/:id/productos',async(req,res)=>{
    //logica
    
    res.json()
    })

carritosRouter.delete('/:id',async(req,res)=>{
    //logica
    
    res.json()
})

carritosRouter.delete('/:id/productos/:id_prod',async(req,res)=>{
        //logica
        
    res.json()
})
module.exports= carritosRouter

