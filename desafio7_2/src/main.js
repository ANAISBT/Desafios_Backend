import ContenedorSQL from './contenedores/ContenedorSQL.js'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import config from './config.js'
import express from 'express'

//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes')


//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    //Implementación
    console.log("Un cliente se ha conectado");

    mensajes=mensajesApi.listarAll();
    productos=productosApi.listarAll();
    socket.emit("mensajes",mensajes);
    socket.emit("productos",productos);

    socket.on("nuevoProducto", (data)=>{
        productos.push(data);
        io.sockets.emit("productos",productos);
        productosApi.guardar(data);
    });

    socket.on("nuevoMensaje", (data)=>{
        mensajes.push(data);
        io.sockets.emit("mensajes",mensajes);
        mensajesApi.guardar(data);
    });
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get("/", (req, res) => {
    res.sendFile("D:/DISCO D/CODERHOUSE_BACKEND/Desafios/desafio7_2/public/index.html");
  
  });

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
