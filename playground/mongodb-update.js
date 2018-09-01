// const MongoCilent = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

MongoClient.connect(url, { useNewUrlParser: true } , (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    const db = client.db(dbName);
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b8199bae2da2cf8ef66fa03")
    // }, {
    //     $set : {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });



    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5b8173fec60752437fa41f47")
    }, {
        $set : {
            name: 'Reza'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    client.close();
});