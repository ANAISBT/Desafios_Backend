import config from '../config.js'
import knex from 'knex'

//------------------------------------------
// productos en MariaDb
(async()=>{
    try {
        const mariaDbClient = knex(config.mariaDb)
    
        //Implementar creación de tabla
    
        await mariaDbClient.schema.dropTableIfExists("productos");
    
        await mariaDbClient.schema.createTable("productos",(table)=>{
            table.increments("id").primary();
            table.string("nombre").notNullable();
            table.string("precio").notNullable();
            table.string("thumbnail").notNullable();
        })
    
        console.log('tabla productos en mariaDb creada con éxito')
    } catch (error) {
        console.log('error al crear tabla productos en mariaDb')
        console.log(error)
    }finally{
        knex.destroy;
    }
    
    //------------------------------------------
    // mensajes en SQLite3

    try {
        // const baseModule = require("hbs")
        const sqliteClient = knex(config.sqlite3)
    
        //Implementar creación de tabla

        await sqliteClient.schema.dropTableIfExists("mensajes");
    
        await sqliteClient.schema.createTable("mensajes",(table)=>{
            table.increments("id").primary();
            table.unique("author").notNullable();
            table.string("text").notNullable();
            table.date("fecha").notNullable();
        })
    
        console.log('tabla mensajes en sqlite3 creada con éxito')
    } catch (error) {
        console.log(`error al crear tabla mensajes en sqlite3 ${error.messages}`)
    }finally{
        knex.destroy;
    }
})();