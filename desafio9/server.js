const faker = require('faker');

const Contenedor=require("./Contenedor/Contenedor.js");

const {options1}= require("./Config/SQLite3.js")
const {options2}= require("./Config/MariaDB.js")

 const Contenedor1=new Contenedor(options1,"mensajes");
 const Contenedor2=new Contenedor(options2,"productos");


const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.set("view engine", "ejs");
app.set("views", "./views");


const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/productos-test", (req, res) => {
  res.render("tablas",{productos: productos});
});

function generarProducto() {
  const id = faker.random.number();
  const nombre = faker.commerce.productName();
  const precio = faker.commerce.price();
  const thumbnail = faker.image.image();

  return { id, nombre, precio, thumbnail };
}

const messages = [
];

const productos = [
];

for (let i = 0; i < 5; i++) {
  const producto = generarProducto();
  productos.push(producto);
}

app.get("/api/productos-test", (req, res) => {
  res.render("tabla",{productos: productos});
});

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);
  socket.emit("productos", productos);
  
  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
    Contenedor1.guardar(data);
  });

  socket.on("new-product", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
  Contenedor2.guardar(data);
  });
});

const server = http.listen(port, () => {
  console.log(`Escuchando app en el puerto ${server.address().port}`);
});