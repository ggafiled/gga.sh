const express = require('express');

const emojis = require('./emojis');
const shorturls = require('./shorturls');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏'
    });
});

router.use('/emojis', emojis);
router.use('/urls', shorturls);

module.exports = router;