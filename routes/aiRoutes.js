const express = require('express');
const { getAIResponse } = require('../controllers/aiController');

const router = express.Router();

router.post('/ai/prompt', getAIResponse);

module.exports = router;
