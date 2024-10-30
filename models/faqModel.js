const getFaqCollection = (db) => {
    return db.collection('faqs');
}
module.exports = { getFaqCollection };