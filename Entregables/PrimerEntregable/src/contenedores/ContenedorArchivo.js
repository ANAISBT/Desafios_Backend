const {promises: fs}=require('fs')

class ContenedorArchivo{

    constructor(ruta){
        this.ruta=ruta;
    }

    async listar(res,id){
        try{
            const data=await fs.readFile('./db/dbProductos.json','utf-8');
            const productos=JSON.parse(data);
            const producto = productos.find((producto) => producto.id == id);
            if (producto) {
                res.json(producto);
            } else {
                res.json({ error: "Producto no encontrado" });
            }
        }catch(error){
            console.log(error);
        }
    }

    async listarTodos(res){
        try{
            const data=await fs.readFile('./db/dbProductos.json','utf-8');
            const productos=JSON.parse(data);
            res.send(productos);
        }catch(error){
            console.log(error);
        }
    }

    async guardar (res,body){
    const { nombre,timestamp,descripcion,codigo,fotoUrl,precio,stock } = body;
    try{
        const data=await fs.readFile('./db/dbProductos.json','utf-8');
        const productos=JSON.parse(data);
        const id = productos.length + 1;
    const producto = {
        id,
        nombre,
        timestamp,
        descripcion,
        codigo,
        fotoUrl,
        precio,
        stock
    };
    productos.push(producto);
    res.json(productos);

    }catch(error){
        console.log(error);
    }
    }

    async actualizar(id,res,body){
        const { nombre,timestamp,descripcion,codigo,fotoUrl,precio,stock } = body;
        try{
            const data=await fs.readFile('./db/dbProductos.json','utf-8');
            const productos=JSON.parse(data);
            const producto = productos.find((producto) => producto.id == id);
            if (producto) {
                producto.nombre = nombre;
                producto.timestamp = timestamp;
                producto.descripcion = descripcion;
                producto.codigo = codigo;
                producto.fotoUrl= fotoUrl;
                producto.precio = precio;
                producto.stock = stock;

                res.json(producto);
            } else {
                res.json({ error: "Producto no encontrado" });
            }
    
        }catch(error){
            console.log(error);
        }
    }

    async borrar(id,res){
        try{
            const data=await fs.readFile('./db/dbProductos.json','utf-8');
            const productos=JSON.parse(data);
            const producto = productos.find((producto) => producto.id == id);
            if (producto) {
                const index = productos.indexOf(producto);
                productos.splice(index, 1);
                res.json(productos);
            } else {
                res.json({ error: "Producto no encontrado" });
            }
        }catch(error){
            console.log(error);
        }
    }
}

module.exports=ContenedorArchivo