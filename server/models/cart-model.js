const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        title: String,  // snapshot of product title
        price: Number,  // snapshot of product price
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }}, { timestamps: true });


module.exports = mongoose.model('Cart', cartSchema);
    