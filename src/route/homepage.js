const express = require("express");
const router = express.Router();

const db = require("monk")(process.env.MONGODB_URI);
const dbcollection = db.get("ggaurls");

router.get("/", (req, res) => {
    res.locals.pageData = {
        title: "🎉🍲 - Shortener URL [gga-sh] -"
    };
    res.render("index");
});

router.get('/:id', async(req, res) => {
    const {
        id: slug
    } = req.params;
    try {
        const url = await dbcollection.findOne({
            slug: slug
        });
        if (url) {
            res.redirect(url.url);
        }
        res.locals.pageData = {
            title: `🔍 - Sorry Not Found For This Link ${slug} -`,
            slug: slug
        };
        res.render("error403");
    } catch (err) {
        next(res.render("error403"));
    }
})

module.exports = router;