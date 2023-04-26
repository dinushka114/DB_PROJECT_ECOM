const axios = require("axios")

const Order = require("../database/models/Order");
const Product = require("../database/models/Product");

exports.getMyOrders = async (req, res) => {

    const { seller } = req.body;

    const orders = await Order.find({})

    const orderForMyProducts = []

    const tempOrders = []

    const temp=[]

    orders.map(product => {
        tempOrders.push(product)
    })

    tempOrders.map(order=>{
        order.cart.map(item=>{
            if(item.seller==seller){
                temp.push({"id":order._id , "item":item})
            }
        })
    })    


    res.status(200).json(temp)

}