require("dotenv").config();
const express = require("express");
const cryptoRandomString = require('crypto-random-string');
const faker = require("faker");
const rateLimit = require("express-rate-limit");
const db = require("monk")(process.env.MONGODB_URI);
const dbcollection = db.get("ggaurls");
dbcollection.createIndex({
    slug: 1
}, {
    unique: true
});
const router = express.Router();

const createAccountLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 15, // start blocking after 5 requests
    message: {
        status: 429,
        error: "Too many accounts created from this IP, please try again after an 2 minutes."
    }
});

router.post('/', createAccountLimiter, async(req, res) => {
    let {
        url
    } = req.body;

    const slug = cryptoRandomString({
        length: 6,
        type: "url-safe"
    });
    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress

    let doc = await dbcollection.insert({
        slug: slug,
        url: url,
        ipaddress: ip,
        numberOfviews: 0,
        createdAt: Date.now().toLocaleString()
    });
    if (doc) {
        res.json({
            slug: slug,
            url: url,
        });
    }
});

module.exports = router;