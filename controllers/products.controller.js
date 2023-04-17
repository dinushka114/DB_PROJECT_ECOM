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

exports.getSingleProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
        res.status(200).json({ product })
    } else {
        res.status(404).json({ message: "Product not found", status: 'FAILED' })

    }
}

exports.getProducts = async (req, res) => {
    const products = await Product.find({})
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


        .then(result => {
            res.status(201).json({ message: 'Product Updated', status: 'OK' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Something went wrong ' + err, status: 'FAILED' })
        })
}


exports.deleteProduct = async (req, res) => {
    await Product.deleteOne({_id:req.params.id})
    .then(result => {
        res.status(201).json({ message: 'Product Deleted', status: 'OK' })
    })
    .catch(err => {
        res.status(500).json({ message: 'Something went wrong ' + err, status: 'FAILED' })
    })
}

