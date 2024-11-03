const express = require("express");
const {
  addPayment,
  getAllPayment,
  getUserPayment,
  getSinglePayment,
} = require("../controllers/paymentController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/payment", addPayment);
router.get("/payments", getAllPayment);
router.get("/payments/:email", verifyToken, getUserPayment);
router.get("/singlePay/:email", verifyToken, getSinglePayment);

module.exports = router;
