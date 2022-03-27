/* -------------------------------------------------------------------------- */
/*                     5to Desafío: Motores de Plantillas                     */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Consigna: ------------------------------- */
/*
1) Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
    Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
    Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
    Ambas páginas contarán con un botón que redirija a la otra.

2) Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.

3) Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.

4) Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.
*/

const express = require('express')
const { Router } = require('express')
const router = Router()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Container = require('./manejoA.js')
const file = new Container('../data/productos.txt')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const mensajes = []


file.init()
app.use(express.static('../public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

router.get('/', (req, res) =>{
    const elementos = file.getAll()
    res.send(JSON.stringify(elementos))
})

io.on('connection', (socket) =>{
    console.log('USUARIO conectado')
    socket.on('new_product',async (data)=>{
        await file.save(data)
        io.sockets.emit('productos', data)
    })
})


io.on('connection', (socket)=>{
    socket.emit('Mensajes', mensajes)
    socket.on('new_message', data =>{
        data.time = new Date().toLocaleTimeString()
        data.date = new Date().toLocaleDateString()
        messages.push(data)
        io.sockets.emit('Mensajes', [data])
    })

})


app.use('/api/productos', router)

httpServer.listen( process.env.PORT ||3000, () => console.log('server on'))