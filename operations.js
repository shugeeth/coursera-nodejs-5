const assert = require('assert')

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection)
    coll.insertOne(document, (err, result) => {
        assert.equal(err, null)
        console.log('Inserted ' + result.result.n + ' documents into the collection ' + collection)
        callback(result)
    }) 
}

exports.removeDocuments = (db, document, collection, callback) => {
    const coll = db.collection(collection)
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null)
        console.log("Removed the document ", document)
        callback(result)
    })

}

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection)
    coll.find({}).toArray((err, docs) => {
        assert.equal(err, null)
        callback(docs)
    })
}

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection)
    coll.updateOne(document, {$set: update}, null, (err, result) => {
        assert.equal(err, null)
        console.log("Updated the document with ", update)
        callback(result)
    })
}