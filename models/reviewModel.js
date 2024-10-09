const getReviewCollection = (db) => {
    return db.collection("reviews");
};


module.exports = { getReviewCollection };