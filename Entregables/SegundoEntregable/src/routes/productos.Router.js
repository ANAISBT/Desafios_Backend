const express = require("express");
const mongoose = require("mongoose");
const { Router } = express;
const productosRouter = new Router();

//importtamos la clase Container
const ContenedorArchivo = require("../contenedores/ContenedorArchivo");
const ContenedorMongo = require("../contenedores/ContenedorMongoDB");
const ProductoService = new ContenedorArchivo("./db/dbProductos.json");

//PRODUCTOS DAO MONGO

const productosSquema=new mongoose.Schema({
        nombre:{ type: String, required: true },
        descipcion:{ type: String, required: true },
        codigo: { type: Number, required: true } ,
        fotoUrl:{ type: String, required: true } ,
        precio:{ type: Number, required: true },
        stock:{ type: Number, required: true }
},{ timestamps: true });

const ProductoDAOMongo=new ContenedorMongo('productos',productosSquema);

//Función de Error

const crearErrorNoEsAdmin = (ruta, metodo) => {
  const error = {
    error: -1,
  };
  if (ruta && metodo) {
    error.description = `ruta ${ruta} metodo ${metodo} no autorizada`;
  } else {
    error.description = "NO AUTORIZADO";
  }
  return error;
};

//Middleware para permiso de Administrador

const esAdmin = true;
const soloAdmins = (req, res, next) => {
  if (!esAdmin) {
    res.json(crearErrorNoEsAdmin(req.url, req.method));
  } else {
    next();
  }
};

productosRouter.get("/", async (req, res) => {
// LLamada a las difrentes funciones de archivos, mongo y firebase
//   ProductoService.listarTodos(res);
try {
    const productos= await ProductoDAOMongo.listarTodos();
    res.status(200).json(productos);
} catch (err) {
    res.status(500).send({err:`Ocurrio un error : ${err.message}`})
}
  
});

productosRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
// LLamada a las difrentes funciones de archivos, mongo y firebase
//   ProductoService.listar(res, id);
try {
    const producto=await ProductoDAOMongo.listar(id);
    if(producto){
        res.status(200).json(producto);
    }else{
        res.send('No se encontró el producto');
    }
} catch (err) {
    res.status(500).send({err:`Ocurrio un error : ${err.message}`})
}
});

productosRouter.post("/", soloAdmins, async (req, res) => {
// LLamada a las difrentes funciones de archivos, mongo y firebase
//   ProductoService.guardar(res, req.body);
try {
    const producto=await ProductoDAOMongo.guardar(req.body);
    res.status(200).json(producto.id);
} catch (err) {
    res.status(500).send({err:`Ocurrio un error : ${err.message}`})
}
});

productosRouter.put("/:id", soloAdmins, async (req, res) => {
  const { id } = req.params;
// LLamada a las difrentes funciones de archivos, mongo y firebase
//   ProductoService.actualizar(id, res, req.body);
    try {
        const producto=await ProductoDAOMongo.actualizarProducto(id,req.body);
        res.status(200).send(producto);
    } catch (err) {
        res.status(500).send({err:`Ocurrio un error : ${err.message}`})
    }

});

productosRouter.delete("/:id", soloAdmins, async (req, res) => {
  const { id } = req.params;
// LLamada a las difrentes funciones de archivos, mongo y firebase
//   ProductoService.borrar(id, res);
try {
    const producto=await ProductoDAOMongo.borrarProducto(id);
    res.status(200).send(ProductoDAOMongo.listarTodos());
} catch (err) {
    res.status(500).send({err:`Ocurrio un error : ${err.message}`})
}
});

module.exports = productosRouter;
