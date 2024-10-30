// Get all created teams.
const getAllFaqs = async (req, res) => {
    const db = req.app.locals.db;
    const teamCollection = getTeamsCollection(db);
    const result = await teamCollection.find().toArray();
    res.send(result);
};

module.exports = { getAllFaqs };