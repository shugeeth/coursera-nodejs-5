const { MongoClient } = require('mongodb')
const assert = require('assert')
const dboper = require('./operations')

const url = 'mongodb://127.0.0.1:27017/'
const dbName = 'conFusion'

const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect((err, client) => {

    assert.equal(err, null)
    console.log("Connected correctly to server")
    const db = client.db(dbName)
    
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"}, 
    'dishes', (result) => {
        console.log("Insert Document:\n", result.ops)
        dboper.findDocuments(db, 'dishes',
        (docs) => {
            console.log("Found Documents:\n", docs)
            dboper.updateDocument(db, { name: "Vadonut" }, { description: "Updated Test" },
            'dishes', (result) => {
                console.log("Updated Document:\n", result.result)
                // client.close()

                dboper.removeDocuments(db, {name: 'Vadonut'},
                'dishes', (result) => {
                    console.log("Removed "+result.result.n+" Document.\n")
                    db.dropCollection('dishes', (result) => {
                        console.log("Dropped Collection: ", result)
                        client.close()
                    })
                })
                
            })
        })
    })

})