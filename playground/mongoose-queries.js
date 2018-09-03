const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// var id = '5b8c908462798921263e6e2311';

// if(!ObjectId.isValid(id)){
//     console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });


// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

var userId = '5b8c94f7d4d5474c2665c1e0';

User.findById(userId).then((user) => {
    if(!user){
        console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));

}).catch((e) => console.log(e));