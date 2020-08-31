const express = require("express");
const cryptoRandomString = require('crypto-random-string');
const faker = require("faker");

const router = express.Router();

router.post('/', (req, res) => {
    let {
        url
    } = req.body;
    res.json({
        slug: cryptoRandomString({
            length: 6,
            type: "url-safe"
        }),
        url: url
    });
});

module.exports = router;