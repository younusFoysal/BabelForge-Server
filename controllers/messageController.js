
const { addMessages, AllMessages } = require("../services/messageService");


// add messages
const addMessage = async (req, res) => {
    const db = req.app.locals.db;
    const message = req.body;
    const result = await addMessages(db, message);
    res.send(result);
}

// get all messages
const AllMessage = async (req, res) => {
    const db = req.app.locals.db;
    const result = await AllMessages(db);
    res.send(result);
}









module.exports = { addMessage, AllMessage };