const express = require("express");
const {
  addPayment,
  getAllPayment,
  getUserPayment,
  getSinglePayment,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/payment", addPayment);
router.get("/payments", getAllPayment);
router.get("/payments/:email", getUserPayment);
router.get("/singlePay/:email", getSinglePayment);

module.exports = router;
