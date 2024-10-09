const express = require('express');
const { addPayment, getAllPayment, getSinglePayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/payment',addPayment);
router.get('/payments',getAllPayment);
router.get('/payment-single/:email', getSinglePayment);

module.exports = router;