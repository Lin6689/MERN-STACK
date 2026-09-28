const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },

    price : {
        type : Number,
        required : false,
    },

    stock : {
        type : Number,
        required : false,
    },
    category : {
        type : String,
        required : true,
    },

}, { timestamps: true });

module.exports = mongoose.model("Product" , productSchema);