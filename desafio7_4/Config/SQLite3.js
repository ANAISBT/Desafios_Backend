const baseModule = require("hbs")

const options1={
    client:'sqlite3',
    connection: {
        filename:"../DB/my-db.sqlite"
      },
      useNullAsDefault: true
    }

module.exports={options1}