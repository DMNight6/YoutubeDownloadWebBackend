const express = require('express');
const Router = express.Router();

const BasicSort = require('../Functions/BasicSort');
const ListSort = require('../Functions/ListSort')

Router.get('/', async(req, res) => {
    let query = req.query.queryText;
    let valid = false;

    if (!query) return res.sendStatus(404).send('Unable to find the correct parameters!');
    try { new URL(query); valid = true } catch {};

    if (valid) res.send(await BasicSort(query));
    else res.send(await ListSort(query));
});

module.exports = Router; // Export the router for index routes.