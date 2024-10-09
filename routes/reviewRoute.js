const express = require("express");
const router = express.Router();

const { addReview, allReview, deleteReview } = require("../controllers/reviewController");


// add review
router.post('/reviews/add', addReview);

// get all reviews
router.get('/reviews', allReview);

// delete review
router.delete('/reviews/:id', deleteReview);




module.exports = router;