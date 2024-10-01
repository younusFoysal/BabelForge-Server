const { getMessagesCollection } = require("../models/messageModel");

// add message
const addMessages = async (db, message) => {
    const messagesCollection = getMessagesCollection(db);
    return await messagesCollection.insertOne(message);
};



// get al messages
const AllMessages = async (db) => {
    const messagesCollection = getMessagesCollection(db);
    return await messagesCollection.find().toArray();
};












module.exports = { addMessages, AllMessages };