const express = require('express');
const emojis = require('./emojis');
const shorturls = require('./shorturls');

const router = express.Router();

router.use('/emojis', emojis);
router.use('/urls', shorturls);

module.exports = router;