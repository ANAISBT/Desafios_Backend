let productosDao
let carritosDao

switch ('mongo') {
    case 'json':
        const { default: ProductosDaoArchivo } = require('./productos/ProductosDaoArchivo.js')
        const { default: CarritosDaoArchivo } = require('./carritos/CarritoDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'firebase':
        const { default: ProductosDaoFirebaseDb } = require('./productos/ProductoDaoFirebase.js')
        const { default: CarritosDaoFirebaseDb } = require('./carritos/CarritoDaoFirebase.js')

        productosDao = new ProductosDaoFirebaseDb()
        carritosDao = new CarritosDaoFirebaseDb()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = require('./productos/ProductosDaoMongoDB.js')
        const { default: CarritosDaoMongoDb } = require('./carritos/CarritoDaoMongoDb.js')

        productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()

        break
}

module.exports= { productosDao, carritosDao }