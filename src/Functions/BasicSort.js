const { default: YouTube } = require('youtube-sr');
const ytdl = require('ytdl-core')

module.exports = async(data) => {
    if (!YouTube.validate(data)) return [] // Return nothing when validation fails
    let video = await YouTube.getVideo(data);
    return [{ thumbnail: video.thumbnail.url, name: video.title, duration: video.durationFormatted, videoURL: video.url, id: '1'}];
}