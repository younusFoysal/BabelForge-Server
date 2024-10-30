const { getFaqCollection } = require("../models/faqModel");

// Get all created teams.
const getAllFaqs = async (req, res) => {
    const db = req.app.locals.db;
    const faqCollection = getFaqCollection(db);
    const result = await faqCollection.find().toArray();
    res.send(result);
};

module.exports = { getAllFaqs };