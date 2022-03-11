/* -------------------------------------------------------------------------- */
/*                          4to Desafío: API RESTful                          */
/* -------------------------------------------------------------------------- */
/* -------------------------------- Consignas ------------------------------- */
/*
1. Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
  GET '/api/productos' -> devuelve todos los productos.
  GET '/api/productos/:id' -> devuelve un producto según su id.
  POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
  PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
  DELETE '/api/productos/:id' -> elimina un producto según su id.
*/
const express = require('express');
const Productos = require('../productos/productosGen.js');
const {Router} = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = Router();
const productos = new Productos(__dirname + '../data/productos.txt');

router.get('/', (req, res) => {
  return res.json(productos.list);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const objeto = productos.get(id);
  if (objeto != null) {
    return res.json(objeto);
  } else {
    return res.json(`El producto ${id} no existe`);
  }
});
router.post('/', (req, res) => {
  const objeto = req.body;
  productos.add(objeto);
  return res.json(objeto);
});
router.put('/:id', (req, res) => {
  const objeto = req.body;
  const id = req.params.id;
  const resultado = productos.update(id, objeto);
  if (resultado != null) {
    return res.json(productos.update(id, objeto));
  } else {
    return res.json(`El producto ${id} no existe`);
  }
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const eliminar = productos.delete(id);
  if (eliminar != null) {
    return res.json(`El producto ${id} ha sido eliminado`);
  } else {
    return res.json(`El producto ${id} no existe`);
  }
});

app.use('/api/productos', router);
app.use(express.static('./views'));

app.listen(8080);