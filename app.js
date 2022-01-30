const express = require('express');

const APP = express();

require('./Routes')(APP);

module.exports = APP;