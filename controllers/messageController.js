
const { addMessages, AllMessages, deleteMessages } = require("../services/messageService");


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

const deleteMessage = async (req, res) => {
    const db = req.app.locals.db;
    const mid = req.params.id;
    const result = await deleteMessages(db, mid);
    res.send(result);
}









module.exports = { addMessage, AllMessage, deleteMessage };