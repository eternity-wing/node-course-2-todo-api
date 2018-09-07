const mongoose = require('mongoose');
const validator = require('validator');

// {
//     email: 'eternity.wings@gmail.com',
//     password: 'myPass123',
//     tokesn: [{
//         access: 'auth',
//         token: 'asdsadsadsaasd',

//     }]
// }

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email address.'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});


module.exports = {User};