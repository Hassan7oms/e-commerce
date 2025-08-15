const mongoose = require('mongoose');
const path = require('path');

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null},
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    path: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { timestamps: true });
const Category = mongoose.model('Category', CategorySchema);