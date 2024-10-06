const express = require('express');
const { visitorsInfo } = require('../controllers/VisitorController');
const router = express.Router();

router.get('/visitor', visitorsInfo);

module.exports = router;
