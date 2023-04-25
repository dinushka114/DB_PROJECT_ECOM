const router = require("express").Router()
const adminController = require("../controllers/admin.controller");
const eventController = require("../controllers/event.controller");


router.get("/get-all-orders" , adminController.getAllOrders);
router.post("/change-order-status" , adminController.changeOrderStatus);

router.post("/events" , eventController.event)

module.exports = router;