const { mongoose, Schema } = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    cart: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    delivery_service:{
        type:String,
        required:true
    },
    payment_id: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'Pending'
    }
}, { timestamps: true })

module.exports = new mongoose.model('Order', OrderSchema)