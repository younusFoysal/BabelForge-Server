const express = require('express');
const { addPayment, getAllPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/payment',addPayment);
router.get('/payments',getAllPayment);

module.exports = router;