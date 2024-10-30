const express = require('express');
const { getAllFaqs } = require('../controllers/faqController');
const router = express.Router();

// Get all faqs
router.get('/faqs', getAllFaqs);

module.exports = router;