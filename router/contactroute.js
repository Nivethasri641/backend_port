const express = require('express');
const router = express.Router();
const { sendMessage } = require('../src/controllers/contactcontroller');

router.post('/', sendMessage);

module.exports = router;
