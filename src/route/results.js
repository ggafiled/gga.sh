const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.locals.pageData = {
        title: "🎉🍲 - Shortener URL [gga-sh] -"
    };
    res.render("results");
});

module.exports = router;