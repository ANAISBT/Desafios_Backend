// const ContenedorMongoDb=require('../contenedores/ContenedorMongoDb.js');
// const ProductoDaoMongo=new ContenedorMongoDb('productos', {
//     id:{ type: Number, required: true },
//         nombre:{ type: String, required: true },
//         timestamp:{ type: String, required: true },
//         descipcion:{ type: String, required: true },
//         codigo: { type: Number, required: true } ,
//         fotoUrl:{ type: String, required: true } ,
//         precio:{ type: Number, required: true },
//         stock:{ type: Number, required: true }
// });

const admin = require("firebase-admin");

const config = require('../config.js');

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL:'https://coder-house-backend-d006a.firebaseio.com'
})

const db = admin.firestore();

const main=async()=>{
    try {
    
        //Implementar creación de tabla
    
        // await ProductoDaoMongo.crear();

        const productos=db.collection("productos");
        const elementos=await productos.add({
            "id":1,
            "nombre":"Smartphone SAMSUNG Galaxy A13 ",
            "timestamp":"",
            "descipcion":" 6.59'' 4GB 64GB 50+5+2+2MP Negro",
            "codigo": "0001" ,
            "fotoUrl":"https://plazavea.vteximg.com.br/arquivos/ids/11219353-300-300/20271556.jpg?v=637880257892930000" ,
            "precio":679.00,
            "stock":10
        });
        console.log(elementos);
    
        console.log('tabla productos creada con éxito')
    } catch (error) {
        console.log('error al crear tabla productos')
        console.log(error)
    }

    try {
    
        //Implementar creación de tabla

        const carritos=db.collection("carritos");
        const elementos=await carritos.add({
            "id":1,
            "timestamp": 1646021896,
            "productos":[
                {
                    "id":1,
                    "nombre":"Smartphone SAMSUNG Galaxy A13 ",
                    "timestamp":"",
                    "descipcion":" 6.59'' 4GB 64GB 50+5+2+2MP Negro",
                    "codigo": "0001" ,
                    "fotoUrl":"https://plazavea.vteximg.com.br/arquivos/ids/11219353-300-300/20271556.jpg?v=637880257892930000" ,
                    "precio":679.00,
                    "stock":10
                },
                {
                    "id":2,
                    "nombre":" Smartphone MOTOROLA G31",
                    "timestamp":"",
                    "descipcion":"6.4'' 4GB 128GB 50MP+8MP+2MP Gris",
                    "codigo": "0002",
                    "fotoUrl": "https://plazavea.vteximg.com.br/arquivos/ids/24618535-1000-1000/20326360.jpg",
                    "precio": 729.00,
                    "stock":20
                }
            ]
        },);
        console.log(elementos);
    
        console.log('tabla carritos creada con éxito')
    } catch (error) {
        console.log('error al crear tabla carritos')
        console.log(error)
    }
}

main();