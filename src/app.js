require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const expressEjsLayouts = require("express-ejs-layouts");
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const frontendRoute = require('./route');

const app = express();

app.engine('ejs', require('ejs').__express);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout extractScripts", true);
app.use(expressEjsLayouts);
app.use('css', express.static(__dirname + "/public/css"));
app.use('js', express.static(__dirname + "/public/js"));
app.use('images', express.static(__dirname + "/public/images"));
app.use(express.static(__dirname + "/public"));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(middlewares.setHeader);

app.use("/", frontendRoute);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;