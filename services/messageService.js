const { ObjectId } = require("mongodb");
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


// delete message

const deleteMessages = async (db, mid) => {
    const messagesCollection = getMessagesCollection(db);
    return await messagesCollection.deleteOne({ _id: new ObjectId(mid) })
}












module.exports = { addMessages, AllMessages, deleteMessages };