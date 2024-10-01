const ChatModel = require('../models/chatModel');

// Fetch all chat messages
const getAllMessages = async (db) => {
    const chatCollection = db.collection('chats');
    return await chatCollection.find({}).sort({ timestamp: 1 }).toArray(); // Retrieve messages sorted by timestamp
};

// Save a new chat message
const saveMessage = async (db, messageData) => {
    const chatCollection = db.collection('chats');
    const newMessage = ChatModel(messageData.message, messageData.username); // Use the ChatModel abstraction
    console.log(messageData)
    const result = await chatCollection.insertOne(messageData);
    console.log(result);
    return messageData;
};

// Delete all chat messages
const deleteAllMessage = async (db) => {
    const chatCollection = db.collection('chats');
    await chatCollection.deleteMany({});
    console.log('All messages deleted');
};

module.exports = {
    getAllMessages,
    saveMessage,
    deleteAllMessage
};
