const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Contenedor=require("./contenedor/contenedor")

const obj1=require("./options/MariaDB")
const obj2=require("./options/SQLite3")
const Service1=new Contenedor (obj1,"productos");
const Service2=new Contenedor (obj2,"mensajes");


const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");

});

const messages = [
];

const productos = [
];

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);
  socket.emit("productos", productos);
  Service1.crearTabla();
  Service2.crearTabla();
  
  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
     Service2.insertar(data);
  });

  socket.on("new-product", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
     Service1.insertar(data);
  });
});

const server = http.listen(port, () => {
  console.log(`Escuchando app en el puerto ${server.address().port}`);
});