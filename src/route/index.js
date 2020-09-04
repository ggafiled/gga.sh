const express = require('express');
const homepage = require('./homepage');
const resultsDisplay = require('./results');

const router = express.Router();

router.use('/', homepage);
router.use('/shorturls', resultsDisplay);

module.exports = router;