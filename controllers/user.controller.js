const { default: mongoose } = require("mongoose");
const { randomBytes } = require('crypto');
const axios = require("axios")

const Order = require("../database/models/Order");
const Product = require("../database/models/Product");

exports.placeOrder = async (req, res) => {
    const { user, cart, address, name, delivery_service } = req.body;

    const payment_id = randomBytes(4).toString('hex');

    const newOrder = await Order({
        user: new mongoose.Types.ObjectId(user),
        cart,
        address,
        name,
        payment_id,
        delivery_service
    })

    newOrder.save()
        .then(async (result) => {
            await axios.post("http://localhost:5000/events", {
                type: "OrderPlaced",
                data: {
                    user_id: user,
                    cart,
                    address,
                    payment_id,
                    delivery_service
                }
            })
            res.status(201).json({ message: "Order Placed successfully", status: "OK" })
        })
        .catch(err => {
            res.status(201).json({ message: "Something went wrong", status: "FAILED" })
        })

}

exports.getMyOrders = async (req, res) => {
    const myOrders = await Order.find({ user: req.params.id })
    if (myOrders) {
        res.status(200).json({ myOrders })
    } else {
        res.status(404).json({ message: "Not found any orders", status: 'FAILED' })

    }
}

exports.searchProduct = async (req, res) => {

    const { query } = req.body;

    const result = await Product.find({ $text: { $search: query } })
    
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json({message:"No product found"})
    }
}