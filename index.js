var express = require('express');
var app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// get mongoDB (the .MongoClient is just a MongoDB syntax thing)
const mongoClient = require('mongodb').MongoClient;

// the url is the location of the mongo DB. places is the database.
const url = 'mongodb://localhost:27017/places';

// MongoDb connection
// mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
//     console.log("Connected correctly to MongoDB");
//     let db = client.db('todos');
    // insertIntoDb(db);
    // getDataFromDb(db);
    // updateDataInDb(db);
    // removeDataInDb(db);
// });

// MongoDb get all todos from DB
app.get('/todos', function (req, res) {
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        // console.log("Connected correctly to MongoDB");
        let db = client.db('places');
        getDataFromDb(db);
    });

    var getDataFromDb = function (db) {
        var collection = db.collection('todos');
        collection.find({}).toArray(function (err, docs) {
            // console.log("Found the following todos: ");
            // console.log(docs);
            res.json(docs);
        })
    }
});

// MongoDb insert into query
app.post('/todos/update', function (req, res) {
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        // console.log("Connected correctly to MongoDB");
        let db = client.db('places');
        updateDataInDb(db);
    });

    var updateDataInDb = function (db) {
        var collection = db.collection('todos');
        collection.updateOne( req.body
            , {
                $set: {"todo": "new todo"}, function (err, result) {
                    console.log("Updated the document with 'Buy shopping' now having updated:true");
                }
            })
    }

    res.json(req.body)
});

var insertIntoDb = function(db) {
    db.collection('todos').insertOne(
        {
            "todo" : "Go back to the future",
            "completed" : "false"
        }
        , function(err, result) {
            console.log("Inserted a todo into the todoList collection");
        })
};

var removeDataInDb = function(db) {
    var collection = db.collection('bristol');
    collection.deleteOne({"address": "beaufort road"}), function (err, result) {
        console.log("Removed the document with the field address = beaufort road");
        }
    };


app.listen(3000, () => console.log('Example app listening on port 3000!'));