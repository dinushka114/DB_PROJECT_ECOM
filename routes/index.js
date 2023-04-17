const router = require("express").Router()
const multer = require("multer")
const productController = require("../controllers/products.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});


const upload = multer({ storage: storage });

router.post('/add-product' , upload.single("image"), productController.addProduct);
router.get('/get-products' , productController.getProducts);
router.get('/get-product/:id' , productController.getSingleProduct);


module.exports = router;