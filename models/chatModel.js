const { ObjectId } = require('mongodb');

// Helper function to ensure consistency in how chat data is structured
const ChatModel = (message, username) => {
    return {
        message: message,
        username: username,
        timestamp: new Date(),
    };
};

module.exports = ChatModel;
