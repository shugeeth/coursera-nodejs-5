const { MongoClient } = require('mongodb')
const assert = require('assert')

const url = 'mongodb://127.0.0.1:27017/'
const dbName = 'conFusion'

const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect((err, client) => {
    assert.equal(err, null)
    console.log("Connected correctly to server")

    const db = client.db(dbName)
    const collection = db.collection('dishes')

    collection.insertOne({"name": "Uthappizza", "description": "test"},
    (err, result) =>{
        assert.equal(err, null)
        console.log('After Insert:\n')
        console.log(result.ops)

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null)
            console.log('Found:\n')
            console.log(docs)
            // client.close()
            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null)

                client.close()
            })
        })
    })
})