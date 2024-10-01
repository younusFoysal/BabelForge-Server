const express = require("express");
const router = express.Router();

const { addMessage, AllMessage} = require("../controllers/messageController");


// add messages
router.post('/messages/add', addMessage);

// get all messages
router.get('/messages', AllMessage);















module.exports = router;