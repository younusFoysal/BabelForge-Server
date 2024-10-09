const { ObjectId } = require("mongodb");
const { getReviewCollection } = require("../models/reviewModel");



// add review
const addReviews = async (db, review) => {
    const reviewCollection = getReviewCollection(db);
    return await reviewCollection.insertOne(review);
};

// get all reviews
const allReviews = async (db) => {
    const reviewCollection = getReviewCollection(db);
    return await reviewCollection.find().toArray();
};


// delete review
const deleteReviews = async (db, reviewId) => {
    const reviewCollection = getReviewCollection(db);
    return await reviewCollection.deleteOne({ _id: new ObjectId(reviewId) })
}





module.exports = { addReviews, allReviews, deleteReviews };