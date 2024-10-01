const { getMessagesCollection } = require("../models/messageModel");


const addMessages = async (db, message) => {
    const messagesCollection = getMessagesCollection(db);
    return await messagesCollection.insertOne(message);
};








module.exports = { addMessages };