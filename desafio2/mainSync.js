const fs=require('fs');
//sin promises 
class Contenedor{
    constructor(file){
        this.file = file;
    }
    createNewFile(){
        fs.writeFileSync(this.file,JSON.stringify([]));
    }
    save(obj){
        let fileInformation=JSON.parse(fs.readFileSync(this.file,"utf-8"));
        obj={...obj,id:fileInformation.length+1};
        fileInformation.push(obj);
        fs.writeFileSync(this.file,JSON.stringify(fileInformation));
        return obj.id;
    }
    getById(id){
        let fileInformation=JSON.parse(fs.readFileSync(this.file,"utf-8"));
        let obj=fileInformation.find(element=>element.id===id);
        return obj;
    }
    getAll(){
        let fileInformation=JSON.parse(fs.readFileSync(this.file,"utf-8"));
        return fileInformation;
    }
    deleteById(id){
        let fileInformation=JSON.parse(fs.readFileSync(this.file,"utf-8"));
        let obj=fileInformation.find(element=>element.id===id);
        let index=fileInformation.indexOf(obj);
        fileInformation.splice(index,1);
        fs.writeFileSync(this.file,JSON.stringify(fileInformation));
        return obj;
    }
    deleteAll(){
        fs.writeFileSync(this.file,JSON.stringify([]));
    }


}

const contenedor = new Contenedor('productos.txt');

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
console.log(contenedor.deleteById(1));
// console.log(contenedor.deleteAll());
