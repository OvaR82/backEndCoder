// Configuramos la variable ejecutar para la carga y ejecución de los métodos
const Contenedor = require('./manejoA.js')

const ejecutar = async function(){
    const file = new Contenedor('products.txt')
    await file.init()

    const save = await file.save({título:'Scout Trooper', precio:200, thumbnail: 'https://starwarsjedifallenorder.fandom.com/wiki/Scout_Troopers'})
    console.log(`Nuevo producto añadido: ID ${save}`)

    const all = file.getAll()
    console.log(`El total de productos es: ${all.length}`)

    const getId = file.getById(2)
    console.log(`Ha seleccionado el producto: ${JSON.stringify(getId)}`)


/* Métodos deshabilitados para evitar errores */
    
    //file.deleteById(4)  
    
    //file.deleteAll()
}

ejecutar()