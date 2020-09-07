const express = require("express");
const router = express.Router();

const db = require("monk")(process.env.MONGODB_URI);
const dbcollection = db.get("ggaurls");

router.get("/", (req, res) => {
    res.locals.pageData = {
        title: "gga.sh | - Shortener URL 🎉🍲 -"
    };
    res.render("index");
});

router.get('/:id', async(req, res, next) => {
    const {
        id: slug
    } = req.params;
    try {
        const doc = await dbcollection.findOne({
            slug: slug
        });
        console.log(doc);
        if (doc) {
            let urlUpdate = await dbcollection.update({
                slug: slug
            }, {
                $set: {
                    numberOfviews: doc.numberOfviews + 1
                }
            }, {
                new: true
            });
            console.log(urlUpdate);
            res.redirect(doc.url)
            next();
        } else {
            res.locals.pageData = {
                title: `🔍 - Sorry Not Found For This Link ${slug} -`,
                slug: slug
            };
            res.render("error403")
            next();
        }
    } catch (err) {
        res.locals.pageData = {
            title: `🔍 - Sorry Not Found For This Link ${slug} -`,
            slug: slug
        };
        res.render("error403")
        next();
    }
});

module.exports = router;