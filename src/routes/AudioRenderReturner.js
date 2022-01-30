const express = require('express');
const Router = express.Router();

const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const FilenameFilter = require('../Functions/FilenameFilter');

Router.get('/', (req, res) => {
    let link = decodeURIComponent(req.query.link); // Decode component to UTF-8 (Hopefully)
    let name = decodeURIComponent(req.query.name); // Decode component to UTF-8 (Hopefully)

    if (!link || !name) return res.sendStatus(404).send('I can\'t find the the correct link or name! This is so sad :('); // Checks if both URL parameter is supplied.
    try { new URL(link) } catch { return res.sendStatus(404).send('This is not a link...'); }; // Return error if param LINK is not a URL

    let filePath = path.resolve(__dirname, '..', 'Files', `${FilenameFilter(name)}.mp3`) // Create a path for file
    let file = fs.createWriteStream(filePath); // Create a WriteStream for pipe
    ytdl(link, { quality: 'highestaudio', filter: 'audioonly'} ).pipe(file); // Download the file.

    file.on('error', (err) => { file.destroy(err); res.sendStatus(500).send(`An error occured while creating the file.`); }); // Delete file when error occures
    file.on('finish', () => { file.end(); res.sendFile(filePath, (err) => { if (err) res.sendStatus(500).send('An error occured while sending the file'); }); }); // Send file after finished piping.
    file.on('close', () => { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); }); // Delete after sending
});

module.exports = Router; // Export to index.