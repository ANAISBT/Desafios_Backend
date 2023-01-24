import config from '../src/config.js'
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
            table.integer("precio").notNullable();
            table.string("link").notNullable();
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
        const sqliteClient = knex(config.sqlite3)
    
        //Implementar creación de tabla

        await sqliteClient.schema.dropTableIfExists("mensajes");
    
        await sqliteClient.schema.createTable("mensajes",(table)=>{
            table.increments("id").primary();
            table.unique("correo").notNullable();
            table.string("texto").notNullable();
        })
    
        console.log('tabla mensajes en sqlite3 creada con éxito')
    } catch (error) {
        console.log(`error al crear tabla mensajes en sqlite3 ${error.messages}`)
    }finally{
        knex.destroy;
    }
})();