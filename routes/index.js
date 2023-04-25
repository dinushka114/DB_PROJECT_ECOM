const router = require("express").Router()
const multer = require("multer")
const productController = require("../controllers/products.controller");
const eventController = require("../controllers/event.controller");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});


const upload = multer({ storage: storage });

router.post('/add-product', upload.single("image"), productController.addProduct);
router.get('/get-products', productController.getProducts);
router.get('/get-product/:id', productController.getSingleProduct);
router.get('/get-products/:seller_id', productController.getProductsBySeller);
router.put('/update-product/:id', upload.single("image"), productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);

router.post('/add-review', productController.addReview);

router.post("/check-review/:id" , productController.checkUserCanReview)

router.post("/events", eventController.event);

module.exports = router;