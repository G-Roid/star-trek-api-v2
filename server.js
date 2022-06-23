const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()

app.use(cors())

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'alien-database'
    dbCollection = 'aliens'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        infoCollection = db.collection(dbCollection)


        app.get('/', (request, response) => {
            response.sendFile(__dirname + '/index.html')
        })

        // app.get('/', (req, res) => {
        //     infoCollection.find().toArray()
        //     .then(results => {
        //         console.log(results)
        //         res.send('done')
        //     })
        //     // .catch(error => console.log(error))
        //   })
        
          app.get('/api/:alienName', (request, response) => {
            const name = request.params.alienName.toLowerCase()
            infoCollection.find({speciesName: name}).toArray()
            .then(result => {
                console.log(result)
                response.json(result[0])
            })    
            .catch(error => console.error(error) )   
        })
    })
    .catch(error => console.log(error))

    

// app.get('/', (request, response) => {
//     response.sendFile(__dirname + '/index.html')
// })

// app.get('/api/:alienName', (request, response) => {
//     const alienName = request.params.alienName.toLowerCase()
//     if (aliens[alienName]) {
//         response.json(aliens[alienName])
//     } else {
//         response.json(aliens['humans'])
//     }

// })

// app.get('/api/', (request, response) => {
//     response.json(aliens)
// })


app.listen(process.env.PORT || PORT, () => {
    console.log(`server is running on ${PORT}`)
})