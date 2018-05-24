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

// api route - get all todos from DB
app.get('/api/todos', function (req, res) {

    // declare function
    const getDataFromDb = function (db) {
        const collection = db.collection('todos');
        collection.find({}).toArray(function (err, docs) {
            res.json(docs);
        })
    }
    // create MongoDb connection
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        let db = client.db('places');

        // call function
        getDataFromDb(db);
    });
});

// api route - update a _todo in DB
app.put('/api/todos/update', function (req, res) {

    // get values from request body object
    const id = req.body._id;
    const todo = req.body.todo;
    const completedFlag = req.body.completed;
    const deletedFlag = req.body.deleted;

    // declare function
    const updateTodoInDb = function (db, id, todo, completedFlag, deletedFlag) {
        const collection = db.collection('todos');
        collection.updateOne(
            { _id : ObjectID(id) },
            { $set:
                    {
                    todo: todo,
                    completed: completedFlag,
                    deleted: deletedFlag
                    },
                    function (err, result) {
                        res.json.result;
                    }
            })
    };
    // create MongoDb connection
    mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        let db = client.db('places');

        // call function
        updateTodoInDb(db, id, todo, completedFlag, deletedFlag);
    });
    // return request body object for testing / debugging
    res.json(req.body)
});

// MongoDb add a _todo to DB
app.post('/api/todos/add', function (req, res) {

    // declare function
    const insertIntoDb = function (db) {
        const collection = db.collection('todos');
        collection.insertOne(req.body, function (err, result) {
                res.json(req.body)
            })
    };
    // create MongoDb connection
    mongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        const db = client.db('places');

        // call function
        insertIntoDb(db);
    });
});

// listen on port 3000 for the node app running (node index.js)
app.listen(3000, () => console.log('Example app listening on port 3000!'));