const ContenedorMongoDb=require('../contenedores/ContenedorMongoDb.js');
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

const main=async()=>{
    try {
    
        //Implementar creación de tabla
    
        await ProductoDaoMongo.crear();
    
        console.log('tabla productos creada con éxito')
    } catch (error) {
        console.log('error al crear tabla productos')
        console.log(error)
    }
}

main();