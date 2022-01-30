const express = require('express');

const APP = express();

require('./Route')(APP);

module.exports = APP;