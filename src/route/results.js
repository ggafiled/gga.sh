const express = require("express");
const router = express.Router();
const db = require("monk")(process.env.MONGODB_URI);
const dbcollection = db.get("ggaurls");

router.get('/', (req, res) => {
    res.locals.pageData = {
        title: "- Generate shortener url with gga.sh -"
    };
    res.render("results");
});

module.exports = router;