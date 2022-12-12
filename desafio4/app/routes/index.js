const express = require("express");
const {Router} = require("express");
const router = Router();
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static('files'));

app.use("/api/", router);

const productos = [
    {
        id: 1,
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    },
];

router.get("/", (req, res) => {
    res.sendFile('D:\DISCO D\CODERHOUSE_BACKEND\Desafios\desafio4\app\files\index.html');
});

router.get("/productos", (req, res) => {
    res.json(productos);
});

router.get("/productos/:id", (req, res) => {
    const { id } = req.params;
    const producto = productos.find((producto) => producto.id == id);
    if (producto) {
        res.json(producto);
    } else {
        res.json({ error: "Producto no encontrado" });
    }
});

router.post("/productos", (req, res) => {
    const { title, price, thumbnail } = req.body;
    const id = productos.length + 1;
    const producto = {
        id,
        title,
        price,
        thumbnail,
    };
    productos.push(producto);
    res.json(producto);
});

router.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    const producto = productos.find((producto) => producto.id == id);
    if (producto) {
        producto.title = title;
        producto.price = price;
        producto.thumbnail = thumbnail;
        res.json(producto);
    } else {
        res.json({ error: "Producto no encontrado" });
    }
});

router.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    const producto = productos.find((producto) => producto.id == id);
    if (producto) {
        const index = productos.indexOf(producto);
        productos.splice(index, 1);
        res.json(producto);
    } else {
        res.json({ error: "Producto no encontrado" });
    }
});




//conexión
const conectedServer = app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en el puerto  ${conectedServer.address().port}`
  );
});


conectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
