const express=require('express')

const ContenedorArchivo= require('./contenedores/ContenedorArchivo.js')

const productosRouter=require('./routes/productos.Router')
const carritosRouter=require('./routes/carritos.Router')

const app= express()


app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use('/api/productos',productosRouter)
app.use('/api/carritos',carritosRouter)
app.get('*',(req,res)=>{
    res.send({status:"error",description:`ruta ${req.url} metodo ${req.method} no implementada`});
})

module.exports=app
