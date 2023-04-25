const router = require("express").Router();
const { ROLE } = require("../../config/roles");
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../../Controllers/auth");

router.get("/", async (req, res) => {
  return res.send("Auth service running...");
});

// Users Registeration Route
router.post("/signup", async (req, res) => {
  await userRegister(req.body, ROLE.buyer, res);
});

// Admin Registration Route
router.post("/signup-seller", async (req, res) => {
  await userRegister(req.body, ROLE.seller, res);
});

// Super Admin Registration Route
router.post("/signup-admin", async (req, res) => {
  await userRegister(req.body, ROLE.administrator, res);
});

// Users Login Route
router.post("/login", async (req, res) => {
  await userLogin(req.body, ROLE.buyer, res);
});

// Admin Login Route
router.post("/login-seller", async (req, res) => {
  await userLogin(req.body, ROLE.seller, res);
});

// Super Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, ROLE.administrator, res);
});

// Super Admin Protected Route
router.get(
  "/admin-protected",
  userAuth,
  checkRole([ROLE.administrator]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

module.exports = router;
