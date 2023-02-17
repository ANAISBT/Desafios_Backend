
const {options1}= require("../Config/SQLite3.js")
const {options2}= require("../Config/MariaDB.js")


const mariaDbClient = require("knex")(options2);
const sqliteClient = require("knex")(options1);

//------------------------------------------
// productos en MariaDb
const main=async()=>{
    try {
    
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
        mariaDbClient.destroy();
    }
    
    //------------------------------------------
    // mensajes en SQLite3

    try {
    
        //Implementar creación de tabla

        await sqliteClient.schema.dropTableIfExists("mensajes");
    
        await sqliteClient.schema.createTable("mensajes",(table)=>{
            table.increments("id").primary();
            table.string("author").notNullable();
            table.string("text").notNullable();
            table.date("fecha").notNullable();
        })
    
        console.log('tabla mensajes en sqlite3 creada con éxito')
    } catch (error) {
        console.log(`error al crear tabla mensajes en sqlite3 ${error.message}`)
    }finally{
        sqliteClient.destroy();
    }
}

main();