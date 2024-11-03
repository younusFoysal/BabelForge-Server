const express = require("express");
const router = express.Router();

const {
  addReview,
  allReview,
  deleteReview,
} = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/auth");

// add review
router.post("/reviews/add", addReview);

// get all reviews
router.get("/reviews", allReview);

// delete review
router.delete("/reviews/:id", verifyToken, deleteReview);

module.exports = router;
