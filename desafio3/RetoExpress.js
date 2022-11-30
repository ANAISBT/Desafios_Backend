
const express=require('express');
const fs=require('fs');
const app=express();

const PORT=8080;

const server=app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});

server.on('error',(error)=>console.log(`Error en servidor ${error}`));

app.get('/',(req,res)=>{
    res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>');
});

app.get('/productos',(req,res)=>{
    //función que devuelva n array con todos los productos del archivo productos.txt

    async function leerArchivo(){
        try{
            const data=await fs.promises.readFile('./productos..json','utf-8');
            const productos=JSON.parse(data);
            res.send(productos);
        }catch(error){
            console.log(error);
        }
    }

    leerArchivo();
});

app.get('/productoRandom',(req,res)=>{
    //función que devuelva un producto aleatorio del archivo productos.txt

    async function productoRandom(){
        try{
            const data=await fs.promises.readFile('./productos..json','utf-8');
            const productos=JSON.parse(data);
            const random=Math.floor(Math.random()*productos.length);
            res.send(productos[random]);
        }catch(error){
            console.log(error);
        }
    }
    productoRandom();
});

