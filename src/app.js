require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const db = require("monk")(process.env.MONGODB_URI);
const dbcollection = db.get("ggaurls");
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', api);

app.get('/:id', async(req, res) => {
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
        res.redirect(`/?error=${slug} not found.`);
    } catch (err) {
        next(err);
    }
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;