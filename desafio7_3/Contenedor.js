import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(id) {
        return this.knex(this.table).where("id",id).select("*");
    }

    async listarAll() {
        return this.knex(this.tabla).select("*");
    }

    async guardar(elem) {
        const ids=await this.knex(this.table).insert(elem);
        return ids;
    }

    async actualizar(elem, id) {
        const dbId=await this.knex(this.table).where("id",id).update(elem);
        return dbId;
    }

    async borrar(id) {
        return this.knex(this.table).where("id",id).del();
    }

}

export default ContenedorSQL