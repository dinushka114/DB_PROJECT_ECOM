const router = require("express").Router()
const sellerController = require("../controllers/seller.controller")
const eventController = require("../controllers/event.controller")

router.post("/get-my-orders", sellerController.getMyOrders);
router.post("/events", eventController.event);


module.exports = router;