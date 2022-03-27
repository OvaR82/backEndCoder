const fs = require('fs')

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