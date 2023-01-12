const {promises: fs}=require('fs')

class ContenedorArchivoCarrito{

    constructor(ruta){
        this.ruta=ruta;
    }

    async crearCarrito(res,body){
        const { timestamp,productos} = body;
    try{
        const data=await fs.readFile('./db/dbCarritos.json','utf-8');
        const carritos=JSON.parse(data);
        const id = carritos.length + 1;
    const carrito = {
        id,
        timestamp,
        productos
    };
    carritos.push(carrito);
    res.json(carrito.id);

    }catch(error){
        console.log(error);
    }
    }

    async listarCarrito(res,id){
        try{
            const data=await fs.readFile('./db/dbCarritos.json','utf-8');
            const carritos=JSON.parse(data);
            const carrito = carritos.find((carrito) => carrito.id == id);
            if (carrito) {
                res.json(carrito.productos);
            } else {
                res.json({ error: "Producto no encontrado" });
            }
        }catch(error){
            console.log(error);
        }
    }

    async agregarProducto(res,id){
    try{
        const data1=await fs.readFile('./db/dbProductos.json','utf-8');
        const productos=JSON.parse(data1);
        const data2=await fs.readFile('./db/dbCarritos.json','utf-8');
            const carritos=JSON.parse(data2);

        const producto = productos.find((producto) => producto.id == id);
         if (producto) {
            carritos[1].productos.push(producto);
            res.json(carritos[1]);
        } else {
            res.json({ error: "Producto no encontrado" });
        }

    }catch(error){
        console.log(error);
    }
    }

    async borrarProducto(res,id,id_prod){
        try{
        
            const data2=await fs.readFile('./db/dbCarritos.json','utf-8');
                const carritos=JSON.parse(data2);
    
            const producto = carritos[id].productos.find((producto) => producto.id == id_prod);
            if (producto) {
                const index = carritos[id].productos.indexOf(producto);
                carritos[id].productos.splice(index, 1);

                res.json(carritos[id]);
            } else {
                res.json({ error: "Producto no encontrado" });
            }
    
    
    
        }catch(error){
            console.log(error);
        }
    }
}

module.exports=ContenedorArchivoCarrito