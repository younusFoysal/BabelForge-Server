
const { addReviews, allReviews, deleteReviews } = require("../services/reviewService");


// add review
const addReview = async (req, res) => {
    const db = req.app.locals.db;
    const review = req.body;
    const result = await addReviews(db, review);
    res.send(result);
}


// get all reviews
const allReview = async (req, res) => {
    const db = req.app.locals.db;
    const result = await allReviews(db);
    res.send(result);
}


// delete review
const deleteReview = async (req, res) => {
    const db = req.app.locals.db;
    const reviewId = req.params.id;
    const result = await deleteReviews(db, reviewId);
    res.send(result);

}






module.exports = { addReview, allReview, deleteReview };