const express = require("express");
const router = express.Router();

const { addMessage} = require("../controllers/messageController");


// add messages
router.post('/messages/add', addMessage);













module.exports = router;