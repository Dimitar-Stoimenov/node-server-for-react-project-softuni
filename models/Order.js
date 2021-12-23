const { Schema, model } = require('mongoose');

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    itemList: [],
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }

});

module.exports = model('Order', schema);