

class Container {
    constructor(file) {
        this.file = file;
    }
    
    fs=require("fs");

    async createNewFile() {
        await fs.promises.writeFile(this.file, JSON.stringify([]));
    }

    async save(object) {

        try{
            if(this.fs.existsSync(this.file)!==false){
                const data=JSON.parse(await this.fs.promises.readFile(this.file,"utf-8"));
                const ultimoId=data[data.length-1].id;
                object={...object,id:ultimoId+1};
                data.push(object);
                await this.fs.promises.writeFile(this.file,JSON.stringify(data,null,2));
            }else{
                object.id=1;
                await this.fs.promises.writeFile(this.file,JSON.stringify([object],null,2));
            }
            return object.id;
        }
        catch(error){
            console.log(error);
        }
}

    async getById(id) {
        try{
            if(this.fs.existsSync(this.file)!==false){
                const data=JSON.parse(await this.fs.promises.readFile(this.file,"utf-8"));
                const obj=data.find(element=>element.id===id);
                return obj;
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
        }
    }

    async getAll() {
        try{
            if(this.fs.existsSync(this.file)!==false){
                const data=JSON.parse(await this.fs.promises.readFile(this.file,"utf-8"));
                data=JSON.parse(data);
                return data;
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
        }
    }

    async deleteById(id) {
        try{
            if(this.fs.existsSync(this.file)!==false){
                const data=JSON.parse(await this.fs.promises.readFile(this.file,"utf-8"));
                const obj=data.find(element=>element.id===id);
                const index=data.indexOf(obj);
                data.splice(index,1);
                await this.fs.promises.writeFile(this.file,JSON.stringify(data,null,2));
                return obj;
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
        }
    }

    async deleteAll() {
        try{
            if(this.fs.existsSync(this.file)!==false){
                await this.fs.promises.writeFile(this.file,JSON.stringify([]));
            }else{
                return null;
            }
        }catch(error){
            console.log(error);
        }
    }
}

const contenedor = new Container('productos.txt');

let obj={
    title: "Refrigeradora",
    price: 123.45,
}

let obj2={
    title: "Calculadora",
    price: 123.45,
}

let obj3={
    title: "Televisor",
    price: 123.45,
}

console.log(contenedor.save(obj));
console.log(contenedor.save(obj2));
console.log(contenedor.save(obj3));
console.log(contenedor.getById(2));
console.log(contenedor.getAll());
console.log(contenedor.deleteById(2));
console.log(contenedor.deleteAll());


