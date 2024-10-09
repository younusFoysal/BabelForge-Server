const express = require("express");
const router = express.Router();

const { addMessage, AllMessage, deleteMessage } = require("../controllers/messageController");


// get all messages
router.get('/messages', AllMessage);

// add messages
router.post('/messages/add', addMessage);


// delete messages
router.delete('/messages/:id', deleteMessage);

















module.exports = router;