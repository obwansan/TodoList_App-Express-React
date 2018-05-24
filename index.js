// require in express and call it to create the 'app'
// got it as already run 'npm install express —save'
const express = require('express');
const app = express();

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// get mongoDB (don't need to know what .MongoClient does)
const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// the url is the location of the mongoDB. 'places' is the name of the database.
const url = 'mongodb://localhost:27017/places';

// get all todos from DB
app.get('/api/todos', function (req, res) {

    const getDataFromDb = function (db) {
        const collection = db.collection('todos');
        collection.find({}).toArray(function (err, docs) {
            res.json(docs);
        })
    }
    // MongoDb connection
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        let db = client.db('places');
        getDataFromDb(db);
    });
});

// update a _todo in DB
app.put('/api/todos/update', function (req, res) {

    const id = req.body._id;
    const todo = req.body.todo;
    const completeFlag = req.body.completed;

    const updateTodoInDb = function (db, id, todo, completeFlag) {
        const collection = db.collection('todos');
        collection.updateOne(
            { _id : ObjectID(id) },
            { $set:
                    {
                    todo: todo,
                    completed: completeFlag
                    },
                    function (err, result) {
                        res.json.result;
                    }
            })
    };
    // MongoDb connection
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        let db = client.db('places');
        updateTodoInDb(db, id, todo, completeFlag);
    });

    res.json(req.body)
});

// MongoDb add a todo to DB
app.post('/api/todos/add', function (req, res) {

    var insertIntoDb = function (db) {

        var collection = db.collection('todos');
        collection.insertOne(req.body, function (err, result) {
                res.json(req.body)
            })
    };
    // MongoDb connection
    mongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        let db = client.db('places');
        insertIntoDb(db);
    });
});


var removeDataInDb = function (db) {
    var collection = db.collection('bristol');
    collection.deleteOne({"address": "beaufort road"}), function (err, result) {
        console.log("Removed the document with the field address = beaufort road");
    }
};

app.listen(3000, () => console.log('Example app listening on port 3000!'));