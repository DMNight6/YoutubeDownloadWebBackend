const MediaReturner = require('../src/routes/MediaReturner');
const AudioRenderReturner = require('../src/routes/AudioRenderReturner');

module.exports = (app) => {
    app.use(require('cors')());

    app.use('/param', MediaReturner);
    app.use('/audioRender/', AudioRenderReturner);
    app.use('*', (req, res) => res.sendStatus(404).send('Forbidden Access.'));
};

// Practising using ; for C programming. (It may seem annoying but worth it :D)