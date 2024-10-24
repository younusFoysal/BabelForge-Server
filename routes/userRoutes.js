const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin, verifyHost } = require("../middleware/auth");
const {
  createJwtToken,
  logout,
  createPaymentIntent,
  addUser,
  updateUserProfile,
  getUser,
  getAllUsers,
  UpdatePackage,
} = require("../controllers/userController");

router.post("/jwt", createJwtToken);
router.get("/logout", logout);
router.post("/create-payment-intent", verifyToken, createPaymentIntent);
router.post("/users/add", addUser);
router.put("/user", updateUserProfile);
router.get("/user/:email", getUser);
router.get("/users", getAllUsers);
router.patch("/users/update/:email", updateUserProfile);
router.put("/users/update/:email", UpdatePackage);

module.exports = router;
