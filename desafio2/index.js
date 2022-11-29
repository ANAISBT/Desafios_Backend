const Conteiner= require('./Conteiner');
const productos= new Conteiner('./productos.json');

async function main() {

    const obj1 = {
        nombre: 'Escuadra',
        precio: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    }

    const obj2 = {
        nombre: 'Calculadora',
        precio: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    }

    const obj3 = {
        nombre: 'Globo Terráqueo',
        precio: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    }

    //save
    await productos.save(obj1).then((id) => console.log(id));
    await productos.save(obj2).then((id) => console.log(id));
    await productos.save(obj3).then((id) => console.log(id));
    //getById
    await productos.getById(2).then((obj) => console.log(obj));
    //getAll
    await productos.getAll().then((data) => {
        console.log(data);
    });
    //deleteById
    await productos.deleteById(2).then(() => console.log('Se elimino el objeto con id 2'));
    //deleteAll
    await productos.deleteAll().then(() => {
        console.log('Se eliminaron todos los productos');
    });
}

main();

