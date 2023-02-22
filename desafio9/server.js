const faker = require('faker');
// ---------------------------------------------
const mongoose = require('mongoose');
const { Author, Message } = require('./MongoSchema.js');
// ----------------------------------------------------------

const { normalize, schema, denormalize } = require("normalizr");

const Contenedor=require("./Contenedor/Contenedor.js");

// const {options1}= require("./Config/SQLite3.js")
const {options2}= require("./Config/MariaDB.js")

//  const Contenedor1=new Contenedor(options1,"mensajes");
 const Contenedor2=new Contenedor(options2,"productos");

 mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });



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
  res.render("tablas",{productos: productosFakers});
});

function generarProducto() {
  const id = faker.random.number();
  const nombre = faker.commerce.productName();
  const precio = faker.commerce.price();
  const thumbnail = faker.image.image();

  return { id, nombre, precio, thumbnail };
}

const messages = [];

const productosFakers = [];

const productos=[];

for (let i = 0; i < 5; i++) {
  const productoFaker = generarProducto();
  productosFakers.push(productoFaker);
}

const authorSchema = new schema.Entity('authors');

const postSchema = new schema.Entity('messages', {
  author: authorSchema,
}, { 
  idAttribute: 'id',
  processStrategy: (value, parent, key) => ({ ...value, id: 'mensajes' }),
});

 const util=require('util');

 function print(objeto){
     console.log(util.inspect(objeto, false,12,true)); }


io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);
  socket.emit("productos", productos);
  
  socket.on("new-message", (data) => {
    console.log(data);
    

    const dataNormalizr=normalize(data,postSchema);
    print(dataNormalizr);
// -------------------------------------------------------------
    const authors = Object.values(dataNormalizr.entities.authors);
    const mensajes = Object.values(dataNormalizr.entities.messages);

    Author.insertMany(authors)
      .then((authors) => {
        const authorMap = {};

        authors.forEach((author) => {
          authorMap[author.id] = author._id;
        });

        mensajes.forEach((message) => {
          message.author = authorMap[message.author];
        });

        Message.insertMany(mensajes)
          .then(() => {
            console.log('documentos insertados');
            mongoose.connection.close();
          })
          .catch((err) => {
            console.error(err);})

// ---------------------------------------------------------------------
    const denormalizedData = denormalize(dataNormalizr.result, postSchema, dataNormalizr.entities);
    print(denormalizedData);
    messages.push(denormalizedData);
    io.sockets.emit("messages", messages);
    // Contenedor1.guardar(data);
    
     
  });

  socket.on("new-product", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
  Contenedor2.guardar(data);
  });
});
});

const server = http.listen(port, () => {
  console.log(`Escuchando app en el puerto ${server.address().port}`);
});

server.on('error', (err)=> {
  console.log('An error occurred in server, ', err.message)
})