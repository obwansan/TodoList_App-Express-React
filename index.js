// get mongoDB (the .MongoClient is just a MongoDB syntax thing)
const mongoClient = require('mongodb').MongoClient;

// the url is the location of the mongo DB. todos is the database.
const url = 'mongodb://localhost:27017/places';

// MongoDb connection
mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    console.log("Connected correctly to MongoDB");
    let db = client.db('places')
    insertIntoDb(db);
    getDataFromDb(db);
    updateDataInDb(db);
    removeDataInDb(db);
});

var insertIntoDb = function(db) {
    db.collection('bristol').insertOne({
        "address" : "cheese lane"
    }, function(err, result) {
        console.log("Inserted an address into the places collection");
    })
}

var getDataFromDb = function(db) {
    var collection = db.collection('bristol');
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs);
    })
}

var updateDataInDb = function(db) {
    var collection = db.collection('bristol');
    collection.updateOne({"address": "feeder road"}
        , { $set: {"updated": "true"}, function (err, result) {
            console.log("Updated the document with feeder road now having updated:true");
        }
    })
}

var removeDataInDb = function(db) {
    var collection = db.collection('bristol');
    collection.deleteOne({"address": "beaufort road"}), function (err, result) {
        console.log("Removed the document with the field address = beaufort road");
        }
    };
