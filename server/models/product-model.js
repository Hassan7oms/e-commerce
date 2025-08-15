const mongoose= require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    attributes:{
        material: {
            type: String,
            required: true
        },
        origin: {
            type: String,
            required: true
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    variant: [{
        color: {
            type: String
        },
        size: {
            type: String
            
        },
        price: {
            type: Number,
            required: true
        },
        QTyavailable: {
            type: Number,
            required: true
        },
        Qtyreserved: {
            type: Number,
            default: 0
        },
        reorderPoint:{
            type: Number,
            required: true
        }
        

    }],

    categoryID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }]
    
    
},{timestamps:true});



    
