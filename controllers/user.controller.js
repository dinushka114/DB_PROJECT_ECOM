const { default: mongoose } = require("mongoose");
const { randomBytes } = require('crypto');
const axios = require("axios")

const Order = require("../database/models/Order");

exports.placeOrder = async (req, res) => {
    const { user, cart, address, name, delivery_service } = req.body;

    console.log(user)

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