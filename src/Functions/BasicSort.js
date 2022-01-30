const { default: YouTube } = require('youtube-sr');
const ytdl = require('ytdl-core')

module.exports = async(data) => {
    let ID = ytdl.getVideoID(data);
    if (!ID) return [];

    let video = await YouTube.getVideo(`https://youtube.com/watch?v=${ID}`);
    return [{ thumbnail: video.thumbnail.url, name: video.title, duration: video.durationFormatted, videoURL: video.url, id: '1'}];
}