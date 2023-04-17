const { default: mongoose } = require("mongoose");
const Product = require("../database/models/Product")

exports.addProduct = async (req, res) => {
    const { sku, name, price, weight, description, category, quantity, reorder_level } = req.body;

    const url = "http://localhost:4001/uploads/"

    if (!req.file) {
        res.status(400).send({ message: 'Please upload a thumbnail for product.' });
    }

    const imgUrl = url + req.file.originalname;

    const newProduct = await Product({
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
        .then(result => {
            res.status(201).json({ message: 'New Product created', status: 'OK' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong ' + err, status: 'FAILED' })
        })


}

exports.getProducts = async (req, res) => {
    const products = await Product.find({})
    if (products) {
        res.status(200).json({ products })
    } else {
        res.status(404).json({ message: "Not found any products", status: 'FAILED' })

    }

}



