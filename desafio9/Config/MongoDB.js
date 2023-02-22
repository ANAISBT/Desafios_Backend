module.exports= {
        fileSystem: {
            path: './DB'
        },
        mongodb: {
            cnxStr: 'mongodb://localhost/ecommerce',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true,
                 serverSelectionTimeoutMS: 5000,
            }
        }
}