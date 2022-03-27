const fs = require('fs')

class Productos{
    constructor(fileName = '../data/productos.txt'){
        this.file = fileName
        this.countID = 0
        this.list = []
        this.init()
    }
    init(){
        try{
            console.log(`Cargando ${this.file}`)
            const data = fs.readFile(this.file)
            const fileData = JSON.parse(data)
            for(const elemento of fileData){
                this.insert(elemento)
            }
            console.log(`${this.file} cargado`)
        }
        catch (error){
            console.log(`Archivo ${this.file} no encontrado!`)
        }
    }
    find(id){
        let elemento = this.list.find(elemento => elemento.id == id)
        return elemento != undefined ? elemento : null
    }
    insert(elemento){
        try{
            elemento.id = ++this.countID
            this.list.push(elemento)
            return elemento
        }
        catch(err){
            console.log(`Error al insertar el elemento ${err}`)
        }
    }
    update(id, elemento){
        try{
            const index = this.list.findIndex(elemento => elemento.id == id)
            if(index != -1){
                elemento.id = this.list[index].id
                this.list[index] = elemento
                return elemento
            }
            else return null
        }
        catch(err){
            console.log(`Error al actualizar el elemento ${err}`)
        }
    }
    deleteById(id){
        try{
            const index = this.list.findIndex(elemento => elemento.id == id)
            if(index != -1){
                this.list.splice(index, 1)
                return `El elemento ${id} ha sido eliminado`
            }
            else return null
        }
        catch(err){
            console.log(`Error al eliminar el elemento ${id}, ${err}`)
        }
    }
}

module.exports = Productos