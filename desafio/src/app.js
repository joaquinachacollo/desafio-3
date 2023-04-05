import express from "express";
import ProductosManager from "../manager/productosManager.js";

const port = 8080;

const manager = new ProductosManager();
const app = express();
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`servidor funcionando en el puerto ${port}`);
});

const env = async () => {
  let productos = await manager.getProducts();

  app.get("/productos", (req, res) => {
    const producto = req.query.producto;

    if (!producto) {
      res.send({ productos });
    }

    let productosFiltrados = productos.filter((produc) => produc.id <= 4);

    res.send({ productosFiltrados });
  });

  app.get("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let productoSolicitado = productos.find((produc) => produc.id === id);

    res.send(productoSolicitado);
  });
};

env();
