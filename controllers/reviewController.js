const { addReviews, allReviews } = require("../services/reviewService");


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


module.exports = { addReview, allReview };