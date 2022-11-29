const fs= require('fs').promises;

class Conteiner {
    constructor(path) {
        this.path = path;
    }

    async save(obj) {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const array = JSON.parse(data);
            let id;
            //Si el array esta vacio, el id es 1
            //Si no, el id es el ultimo id + 1
            array.length === 0 ? (id = 1) : id = (array[array.length - 1].id + 1);
            //agrergo el id al objeto
            const newObj = {...obj, id};
            array.push(newObj);
            await fs.writeFile(this.path, JSON.stringify(array, null, 2), 'utf-8');
            return newObj.id;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const array = JSON.parse(data);
            const obj = array.find((obj) => obj.id === id);
            return obj;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        const contenido=await fs.readFile(this.path, 'utf-8');
        const array=JSON.parse(contenido);
        return array;
    }

    async deleteById(id) {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const array = JSON.parse(data);
            const index = array.findIndex((obj) => obj.id === id);
            array.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(array, null, 2), 'utf-8');
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try{
            await fs.writeFile(this.path,JSON.stringify([],null,2),'utf-8');
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = Conteiner;