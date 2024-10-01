const chatService = require('../services/chatService');

// Get all chat messages
const getMessages = async (req, res) => {
    const db = req.app.locals.db;
    try {
        const messages = await chatService.getAllMessages(db);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Post a new chat message
const postMessage = async (req, res) => {
    const db = req.app.locals.db;
    const { message, username } = req.body;
    try {
        if (!message || !username) {
            return res.status(400).json({ error: 'Message and username are required' });
        }
        const savedMessage = await chatService.saveMessage(db, { message, username });
        res.json(savedMessage);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save message' });
    }
};

module.exports = {
    getMessages,
    postMessage,
};
