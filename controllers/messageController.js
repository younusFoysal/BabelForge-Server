
const { addMessages } = require("../services/messageService");



const addMessage = async (req, res) => {
    const db = req.app.locals.db;
    const message = req.body;

    const result = await addMessages(db, message);
    res.send(result);
}









module.exports = { addMessage };