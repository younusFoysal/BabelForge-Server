const express = require("express");
const router = express.Router();

const { addReview, allReview } = require("../controllers/reviewController");


// add reviews
router.post('/reviews/add', addReview);

// get all messages
router.get('/reviews', allReview);

module.exports = router;