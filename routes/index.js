const router = require("express").Router();
const { userAuth, checkRole, serializeUser } = require("../Controllers/auth");
const { ROLE } = require("../config/roles");
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("Api running...");
});
// Authentication Router Middleware
router.use("/auth", require("./auth"));

// Admin Protected Route
router.use("/admin", userAuth, checkRole([ROLE.administrator]), require("./admin"));

// Users Protected Route
router.get("/profile", userAuth, checkRole([ROLE.buyer]), async (req, res) => {
  res.status(200).json({ type: ROLE.buyer, user: serializeUser(req.user) });
});

module.exports = router;
