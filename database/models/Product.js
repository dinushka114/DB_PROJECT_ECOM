const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    sku:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    reorder_level:{
        type:Number,
        required:true
    },
    reviews:[Object]
}, {timestamps:true})

module.exports = mongoose.model('Product' , ProductSchema)