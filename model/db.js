const mongoose = require('mongoose')

require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

})

mongoose.connection.on('connection', ()=>{
console.log(`Connection open ${uriDb}` );
})

mongoose.connection.on('error', (e)=>{
    console.log(`Error mongosse conection ${e.message}` );
    })

    mongoose.connection.on('disconnect', (e)=>{
        console.log(`Mongosse disconnect ` );
        })

process.on('SIGINT', async ()=>{
    mongoose.connection.close(()=>{

        console.log('Connection to db terminated')
        process.exit(1)
    })
   
})

module.exports = db