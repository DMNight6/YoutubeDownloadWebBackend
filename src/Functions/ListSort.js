const { default: YouTube } = require("youtube-sr");

module.exports = async(data) => {
    let List = [];
    let v = await YouTube.search(data, {limit: 9});

    for (let i = 0; i < v.length; ++i) {
        let video = v[i];
        List.push({ thumbnail: video.thumbnail.url, name: video.title, duration: video.durationFormatted, videoURL: video.url, id: `${i + 1}`});
    };
    return List;
};