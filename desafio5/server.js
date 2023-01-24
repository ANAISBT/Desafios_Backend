const express= require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

const port= 8000;

const server= app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
}
);

server.on("error", error => console.log(`Error en servidor ${error}`));

//-------------------------------------------

const productos= [];

app.get("/productos", (req, res) => {
    res.render("pages/Formulario",{productos: productos,title: "Formulario de productos"});
});

app.post("/productos", (req, res) => {
    const producto= req.body;
    productos.push(producto);
    res.redirect("/productos");
});   