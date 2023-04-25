const { default: mongoose } = require("mongoose");
const { randomBytes } = require('crypto');
const axios = require("axios")

const Order = require("../database/models/Order");

exports.getAllOrders = async (req, res) => {
    const orders = await Order.find({})
    if (orders) {
        res.status(200).json({ orders })
    } else {
        res.status(404).json({ message: "No orders found", status: "FAILED" })
    }
}

exports.changeOrderStatus = async (req, res) => {
    const { order_id, status } = req.body;

    const order = await Order.findOne({ _id: order_id })
    order.status = status;

    order.save()
        .then(result => {
            res.status(201).json({ message: "Order status updated", status: "OK" })
        })
        .catch(err => {
            res.status(403).json({ message: "Something went wrong", status: "FAILED" })
        })

}