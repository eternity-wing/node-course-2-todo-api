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

    // db.collection('Todos').deleteMany({text: 'Eat launch'}).then((result) => {
    //     console.log(result);
    // });


    // db.collection('Todos').deleteOne({text: 'Eat launch'}).then((result) => {
    //     console.log(result);
    // });


    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });


    // db.collection('Users').deleteMany({name: 'Mostafa'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').findOneAndReplace({_id: new ObjectID("5b7ecaada704ea4d6dce0fb5")}).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // });

    client.close();
});