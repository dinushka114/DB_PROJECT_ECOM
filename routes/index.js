const router = require("express").Router()
const userController = require("../controllers/user.controller");
const eventController = require("../controllers/event.controller");


router.post("/place-order", userController.placeOrder);
router.post("/events", eventController.event);

router.get("/get-orders/:id", userController.getMyOrders)

module.exports = router;