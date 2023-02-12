import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('dbproductos.json')
    }
}

module.exports= ProductosDaoArchivo