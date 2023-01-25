import ContenedorSQL from './Contenedor.js'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import config from './config.js'
import express from 'express'

const port = 3000;
const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile("C:/Users/ANAIS/Desktop/app con socket y mysql/index.html");
});

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
// const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes')

const productos=[]

io.on("connection", async(socket) => {
  console.log("Un cliente se ha conectado");

  // const mensajes=mensajesApi.listarAll();
  //const productos=productosApi.listarAll();
  // console.log(mensajes);
  console.log(productos);
  // socket.emit("messages", mensajes);
  socket.emit("productos", productos);
  
  // socket.on("new-message", (data) => {
  //   messages.push(data);
  //   io.sockets.emit("messages", messages);
  //   console.log(messages);
      mensajesApi.guardar(data);
  // });

  socket.on("new-product", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
    console.log(data);
    productosApi.guardar(data);
  });
});

const server = httpServer.listen(port, () => {
  console.log(`Escuchando app en el puerto ${server.address().port}`);
});