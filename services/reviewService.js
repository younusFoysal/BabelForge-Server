const { getReviewCollection } = require("../models/reviewModel");



// add review
const addReviews = async (db, review) => {
    const reviewCollection = getReviewCollection(db);
    return await reviewCollection.insertOne(review);
};

// get al messages
const allReviews = async (db) => {
    const reviewCollection = getReviewCollection(db);
    return await reviewCollection.find().toArray();
};



module.exports = { addReviews, allReviews };