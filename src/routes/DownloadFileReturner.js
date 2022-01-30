const express = require('express');
const Router = express.Router();

const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const FilenameFilter = require('../Functions/FilenameFilter');

Router.get('/', (req, res) => {
    let link = decodeURIComponent(req.query.link);
    let format = decodeURIComponent(req.query.name);

    if (!link) return res.sendStatus(404).send('Link is not provided. Returned Undefined.');
    try { new URL(link) } catch { return res.sendStatus(500).send('Provided data is not link!')};

    switch(format) {
        case '.mp3':
            let filepath = path.resolve(__dirname, '..', 'Files', `audio.mp3`);
            let file = fs.createWriteStream(filepath)
            ytdl(link, {filter: 'audioonly', quality: 'highestaudio'}).pipe(file);
            file.on('error', (err) => { file.destroy(err); res.sendStatus(500).send('Error occured when piping.'); });
            file.on('finish', () => { file.end(); res.sendFile(filepath, (err) => { if (err) res.sendStatus(500).send('An error occured when sending the file.')} ); });
            file.on('close', () => { if(fs.existsSync(filepath)) fs.unlinkSync(filepath); });
            break;
        case '.mp4':
            let filepath = path.resolve(__dirname, '..', 'Files', 'video.mp4');
            let file = fs.createWriteStream(filepath)
            ytdl(link, { filter: 'videoandaudio', quality: 'highestvideo'}).pipe(file);
            file.on('error', (err) => { file.destroy(err); res.sendStatus(500).send('Error occured when piping.'); });
            file.on('finish', () => { file.end(); res.sendFile(filepath, (err) => { if (err) res.sendStatus(500).send('An error occured when sending the file.')} ); });
            file.on('close', () => { if(fs.existsSync(filepath)) fs.unlinkSync(filepath); });
            break;
    }
})