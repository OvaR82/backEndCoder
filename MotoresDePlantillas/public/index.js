const socket = io.connect();
let productos = []

socket.on('productos',(data)=>{
    productos.push(data)
    render()
})
fetch('api/productos')
    .then( response => response.json())
    .then(data =>{
        productos = data
        render()
    })
function render(){
    $('.productContainer').html('')
    for(let item of productos){
        $('.productContainer').prepend(
            `
            <tr>
                <td>${item.título}</td>
                <td>${item.precio}</td>
                <td>${item.thumbnail}</td>
            </tr>
            `
        )
    }
}
$('#myForm').submit(function(e){
    e.preventDefault()
    data = {
        título: $('#título').val(),
        precio: $('#precio').val(),
        thumbnail: $('#thumbnail').val()
    }
    socket.emit('new_product', data)
})


// Servicio de chat
let username = sessionStorage.getItem('user')
if(!username){
    username = prompt('Ingrese nombre de USUARIO')
}
socket.on('mensajes', data =>{
    chatRender(data)
})
function chatRender(data){
    data.forEach(info =>{
        $('#mensajes').append(
            `
                <div>
                    <strong>${info.author}</strong>
                    :<em>${info.text}</em> [${info.time}, ${info.date}]
                </div>
            `
        )
    })
}
$('#myChat').submit(e =>{
    e.preventDefault()
    const mensaje = {
        author: username,
        text: $('#text').val()
    }
    socket.emit('new_message', mensaje)
})