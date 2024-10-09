const express = require('express');
const { addPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/payment',addPayment);

module.exports = router;