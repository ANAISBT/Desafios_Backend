const express = require("express");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);


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
  
  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });

  socket.on("new-product", (data) => {
    productos.push(data);
    io.sockets.emit("productos", productos);
  });
});

const server = http.listen(port, () => {
  console.log(`Escuchando app en el puerto ${server.address().port}`);
});