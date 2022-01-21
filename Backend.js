const express = require('express');
const Youtube = require('youtube-sr').default;
const sqlite3 = require('sqlite3');
const ytdl = require('ytdl-core');

const App = express();
var db = new sqlite3.Database('./database.db');

const sort = async (data) => {
    let video = await Youtube.searchOne(data);
    return [{thumbnail: video.thumbnail.url, name: video.title, duration: video.durationFormatted, videoURL: video.url}]
} // Sort one video only (For other application end.)

const listSort = async (data) => {
    let List = [];
    let video = await Youtube.search(data, {limit: 10});
    for (let i = 0; i < video.length; ++i) {
        let v = video[i];
        List.push({thumbnail: v.thumbnail.url, name: v.title, duration: v.durationFormatted, videoURL: v.url})
    };

    return List;
} // Sort ten video into a format I wanted (For other application end.)

App.use(require('cors')())

App.get('/param', async(req, res) => {
    let query = req.query.queryText;
    let valid = false;
    if (!query) return res.send('Query Param cannot be empty!');

    try { new URL(query); valid = true; } catch {};

    if (valid) res.send(await sort(query));
    else { res.send(await listSort(query)); };
}); // sends requested data.

App.get('/download', async(req, res) => {
    let query = req.query.link;
    let formats = req.query.format;

    let fs = require('fs');
    let path = require('path');

    if (!query) return res.send('Nothing to see here');

    try {new URL(query)} catch {res.send('Query is not link.')}

    
    if (formats === '.mp3') {
        let file = fs.createWriteStream('video.mp3');
        ytdl(query, { filter: 'audio' }).pipe(file);
        file.once('finish', async() => {file.end(); res.sendFile(path.resolve('video.mp3'), (err) => { if (err) res.sendStatus(500); fs.unlinkSync(path.resolve('video.mp3')) });});
    } else {
        let file = fs.createWriteStream('video.mp4');
        ytdl(query, { filter: 'videoandaudio'}).pipe(file)
        file.once('finish', async() => {file.end(); res.sendFile(path.resolve('video.mp4'), (err) => { if(err) res.sendStatus(500); fs.unlinkSync(path.resolve('video.mp4')) });});
    };
}); // Sends file.

const Server = App.listen(3001, () => {
    let host = Server.address().address;
    let port = Server.address().port;
}); // Set Host and Port

App.get('/requestSearchList', async(req, res) => {
    db.exec("SELECT")
    res.send()
})
Server.once('listening', () => console.log(`Backend started and listening on ${Server.address().address}:${Server.address().port}`));