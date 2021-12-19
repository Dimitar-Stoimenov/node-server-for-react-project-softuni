const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        
    },
    hashedPassword: {
        type: String,        
    },
});

module.exports = model('User', schema);