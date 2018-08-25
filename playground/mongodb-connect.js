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

    // db.collection('Todos').insertOne({

    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    // db.collection('Users').insertOne({
    //     name: 'Mostafa',
    //     age: 28,
    //     location: 'Iran, shiraz'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(result.ops[0]._id.getTimestamp());
    // });


    client.close();
});