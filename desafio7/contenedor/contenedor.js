
// const {op1}= require("./options/mysql.js")


class Contenedor{
    constructor(obj, tabla){
        this.obj=obj;
        this.tabla=tabla;
    }

    async crearTabla(){
        try{
            const knex=require("knex")(this.obj);
            if(this.tabla="productos"){
                await knex.schema.createTable(this.tabla,table=>{
                    table.increments("id")
                    table.string("nombre")
                    table.integer("precio")
                    table.string("linkUrl")
                }).then(()=>console.log(`Tabla ${this.tabla} creada`))
                .catch((err)=>{console.log(err);throw err})
                .finally(()=>{
                    knex.destroy();
                })
            }else if(this.tabla="mensajes"){
                await knex.schema.createTable(this.tabla,table=>{
                    table.increments("id")
                    table.unique("correo")
                    table.string("mensajes")
                    table.date("fecha")
                }).then(()=>console.log(`Tabla ${this.tabla} creada`))
                .catch((err)=>{console.log(err);throw err})
                .finally(()=>{
                    knex.destroy();
                })
            }else{
                console.log("No existe esa tabla")
            }
            
        }catch(err){
            console.log(err);
        }
    }

    async insertar(datos){
        try{
            const knex=require("knex")(this.obj);
            await knex(this.tabla).insert(datos).then(()=>console.log("Datos insertados"))
            .catch((err)=>{console.log(err);throw err})
            .finally(()=>{
                console.log("Conexión termianda")
                knex.destroy()
            })
        }catch(err){
            console.log(err);
        }
    }
}


module.exports=Contenedor