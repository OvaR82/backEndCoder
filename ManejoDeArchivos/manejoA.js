/* -------------------------------------------------------------------------- */
/*                     2do Desafío: Manejo de Archivos                        */
/* -------------------------------------------------------------------------- */

/* -------------------------------- Consigna: ------------------------------- */
/*
1) Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
    save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    
2) Aspectos a incluir en el entregable: 
    El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
    Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
    Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
    Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
    Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 
    El formato de cada producto será: {título: String, precio: Number, thumbnail: String}
*/

// Importamos el método a utilizar
const fs = require('fs')

// Creamos el contenedor de productos con el manejo de métodos en asincronía
class Contenedor{
    constructor(fileName){
        this.file = fileName
        this.countID = 0
        this.list = []
    }
    async init(){
        try{
            const data = await fs.promises.readFile(this.file)
            this.list = JSON.parse(data)
            for(const element of this.list){
                if(element.id > this.countID) this.countID = element.id
            }
        }
        catch (error){
            console.log('Archivo no encontrado, aguarde! Generando...')
        }
    }
    async write(){
        try{
            const str = JSON.stringify(this.list)
            await fs.promises.writeFile(this.file, str)
        }
        catch(err){
            console.log(err)
        }
    }
    async save(object){
        try{
            this.countID++
            object['id'] = this.countID
            this.list.push(object)
            await this.write()
            return this.countID
        }
        catch(err){
            console.log(err)
        }
    }
    getById(id){
        try{
            let element = this.list.find(item => item.id == id)
            return element != undefined ? element : null
            
        }
        catch(err){
            console.log(err)
        }
    }
    getAll(){
            const elements = this.list
            return elements
    }
    async deleteById(id){
        try{
            const index = this.list.findIndex((element) => element.id == id)
            if(index != -1){
                this.list.splice(index, 1)
                await this.write()
            }
        }
        catch(err){
            console.log(err)
        }
    }
    async deleteAll(){
        try{
            this.list = []
            await this.write()
        }
        catch(err){
            console.log(err)
        }
    }
}

module.exports = Contenedor