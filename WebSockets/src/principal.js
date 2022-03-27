/* -------------------------------------------------------------------------- */
/*                     6to Desafío: WebSockets                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Consigna: ------------------------------- */
/*
Consigna 1:  Modificar el último entregable para que disponga de un canal de websocket que permita representar, 
    por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real. 
    Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista.
    Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.
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