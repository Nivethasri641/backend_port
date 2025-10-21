const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('./controllers/contactcontroller');

// POST - send message
router.post('/', sendMessage);

// GET - fetch all messages
router.get('/', getMessages);

module.exports = router;
