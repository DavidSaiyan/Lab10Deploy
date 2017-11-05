var config = require('./../../config');
var MongoClient = require('mongodb').MongoClient;

function addObject(collection, object){
    MongoClient.connect(config.mongoDb, function(err, db) {
        if(err) {
            throw err;
        }else {
            if(object.length > 1){
                db.collection(collection).insertMany(object, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    db.close();
                });
            }else{
                db.collection(collection).insertOne(object, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    db.close();
                });
            }
        }
    });
}

function removeObject(collection, query){
    MongoClient.connect(config.mongoDb, function(err, db) {
        if (err) throw err;
        db.collection(collection).deleteOne(query, function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

function selectObject(collection, query){
    MongoClient.connect(config.mongoDb, function(err, db) {
        if (err) throw err;
        db.collection(collection).find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return result;
        });
    });
}

function findAllFromCollection(collection){
    MongoClient.connect(config.mongoDb, function(err, db) {
        if (err) throw err;
        db.collection(collection).find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return result;
        });
    });
}

module.exports = {
    addObject: addObject,
    removeObject: removeObject,
    selectObject: selectObject,
    findAllFromCollection: findAllFromCollection
};