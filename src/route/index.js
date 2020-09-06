const express = require('express');
const homepage = require('./homepage');
const resultspage = require('./results');

const router = express.Router();

router.use('/results', resultspage);
router.use('/', homepage);


module.exports = router;