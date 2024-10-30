const express = require('express');
const router = express.Router();

// Get all faqs
router.get('/faqs', getAllFaqs)