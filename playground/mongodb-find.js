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


    // db.collection('Todos').find({
    //     _id: new ObjectID("5b817c19e2da2cf8ef66f6fe") 
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count:${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: "Mostafa"}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });


    client.close();
});