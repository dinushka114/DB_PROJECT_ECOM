const { default: mongoose } = require("mongoose");
const Product = require("../database/models/Product")
const axios = require("axios");

exports.addProduct = async (req, res) => {
    const { sku, name, price, weight, description, category, quantity, reorder_level, seller } = req.body;

    const url = "http://localhost:4001/uploads/"

    if (!req.file) {
        res.status(400).send({ message: 'Please upload a thumbnail for product.' });
    }

    const imgUrl = url + req.file.originalname;

    const newProduct = await Product({
        seller,
        sku,
        name,
        price,
        weight,
        description,
        category: new mongoose.Types.ObjectId(category),
        quantity,
        reorder_level,
        image: imgUrl
    })

    newProduct.save()
        .then(async (result) => {
            await axios.post("http://localhost:5000/events", {
                type: "ProductCreated",
                data: {
                    newProduct
                }
            })
            res.status(201).json({ message: 'New Product created', status: 'OK' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong ' + err, status: 'FAILED' })
        })


}

exports.getSingleProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })
    if (product) {
        res.status(200).json({ product })
    } else {
        res.status(404).json({ message: "Product not found", status: 'FAILED' })

    }
}

exports.getProducts = async (req, res) => {
    const products = await Product.find()
    if (products) {
        res.status(200).json({ products })
    } else {
        res.status(404).json({ message: "Not found any products", status: 'FAILED' })

    }

}

exports.updateProduct = async (req, res) => {
    const { sku, name, price, weight, description, category, quantity, reorder_level } = req.body;

    const url = "http://localhost:4001/uploads/"

    if (!req.file) {
        res.status(400).send({ message: 'Please upload a thumbnail for product.' });
    }

    const imgUrl = url + req.file.originalname;

    await Product.updateOne({ _id: req.params.id }, {
        sku,
        name,
        price,
        weight,
        description,
        category: new mongoose.Types.ObjectId(category),
        quantity,
        reorder_level,
        image: imgUrl
    })


        .then(async (result) => {
            await axios.post("http://localhost:5000/events", {
                type: "ProductUpdated",
                data: {
                    sku,
                    name,
                    price,
                    weight,
                    description,
                    quantity,
                    category,
                    reorder_level,
                    imgUrl
                }
            })
            res.status(201).json({ message: 'Product Updated', status: 'OK' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong ' + err, status: 'FAILED' })
        })
}


exports.deleteProduct = async (req, res) => {
    await Product.deleteOne({ _id: req.params.id })
        .then(async (result) => {
            await axios.post("http://localhost:5000/events", {
                type: "ProductDeleted",
                data: {
                    id: req.params.id
                }
            })
            res.status(201).json({ message: 'Product Deleted', status: 'OK' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong ' + err, status: 'FAILED' })
        })
}

exports.getProductsByCategory = async (req, res) => {

}


exports.getProductsBySeller = async (req, res) => {
    const products = await Product.find({ seller: req.params.seller_id })
    if (products) {
        res.status(200).json({ products })
    } else {
        res.status(404).json({ message: "Not found any products", status: 'FAILED' })

    }
}


exports.addReview = async (req, res) => {
    const { review, product, userName, rating } = req.body;

    let isFound = await Product.findOne({ _id: product });
    if (isFound) {
        isFound.reviews.push({ "review": review, "rating": rating, "user": userName })
        isFound.save()
        res.status(201).json({ message: "Review Done", status: "OK" })
    } else {
        res.status(404).json({ message: "Something went wrong", status: "FAILED" })
    }

}

exports.checkUserCanReview = async (req, res) => {

    const { username } = req.body;

    const userNames = [];

    let product = await Product.findOne({ _id: req.params.id })

    for (var i = 0; i < product.reviews.length; i++) {

        userNames.push(product.reviews[i].user)
    }

    if (userNames.includes(username)) {
        return res.json({ status: 0 })
    } else {
        return res.json({ status: 1 })
    }

}