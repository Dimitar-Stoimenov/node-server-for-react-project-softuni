const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [4, 'Name must be atleast 4 characters long'],
    },
    category: {
        type: String,
        enum: ['Smartphones', 'Smartwatches', 'Accesorries'],
        required: [true, 'Category is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be atleast 10 characters long'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be greater than zero'],
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Product', schema);