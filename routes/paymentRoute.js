const express = require('express');
const { addPayment, getAllPayment, getUserPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post('/payment',addPayment);
router.get('/payments',getAllPayment);
router.get('/payments/:email', getUserPayment);

module.exports = router;