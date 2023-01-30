
class Contenedor {

    constructor(config, tabla) {
        this.knex = require("knex")(config);
        this.tabla = tabla
    }

    async listar(id) {
        try{
        return this.knex(this.table).where("id",id).select("*");}
        catch(err){
            res.send(`Ocurrio un error en la db: ${err.message}`)
        }
    }

    async listarAll() {
        try{
        return this.knex(this.tabla).select("*");
        }catch(err){
            res.send(`Ocurrio un error en la db: ${err.message}`)
        }
    }

    async guardar(elem) {
        try{
       return this.knex(this.tabla).insert(elem);
        }catch(err){
            res.send(`Ocurrio un error en la db: ${err.message}`)
        }
    }

    async actualizar(elem, id) {
        try{
        const dbId=await this.knex(this.tabla).where("id",id).update(elem);
        return dbId;}
        catch(err){
            res.send(`Ocurrio un error en la db: ${err.message}`)
        }
    }

    async borrar(id) {
        try{
        return this.knex(this.tabla).where("id",id).del();}
        catch(err){
            res.send(`Ocurrio un error en la db: ${err.message}`)
        }
    }

}

module.exports=Contenedor