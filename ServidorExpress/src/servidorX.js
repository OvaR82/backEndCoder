/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* -------------------------------------------------------------------------- */
/*                            3er Desafío: Express                            */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Consigna: ------------------------------- */
/*
1) Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
  a) Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
  b) Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

2) Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
*/

const express = require('express');
const Contenedor = require('../../ManejoDeArchivos/manejoA.js');

const app = express();
const file = new Contenedor('./products.txt');
file.init();

app.get('/productos', (req, res) => {
  try {
    const objetos = file.getAll();
    res.send(`Los objetos del archivo son ${JSON.stringify(objetos)}`);
  } catch (err) {
    res.send(`Error al obtener los objetos: ${err}`);
  }
});

app.get('/productosRandom', (req, res) => {
  const id = Math.floor(Math.random() * 4) + 1;
  try {
    const objetosRandom = file.getById(id);
    res.send(`El producto con id ${id} es: ${JSON.stringify(objetosRandom)}`);
  } catch (err) {
    res.send(`Error al intentar obtener el producto por id ${err}`);
  }
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  try {
    console.log(`Servidor iniciado en el puerto: http://localhost:${PORT}`);
  } catch (err) {
    server.on('error', (err) => {
      console.log(err);
    });
  }
});
