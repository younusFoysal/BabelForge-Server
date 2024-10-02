const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

// Route to get all messages
router.get('/messages', chatController.getMessages);

// Route to post a new message
router.post('/message', chatController.postMessage);

// Route to delete all messages
router.delete('/messages', chatController.deleteAllMessages);

module.exports = router;
