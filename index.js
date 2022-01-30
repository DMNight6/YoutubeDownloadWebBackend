const PORT = process.env.PORT || 3001; // Config

const App = require('./app');

const server = App.listen(PORT, () => console.log(`Backend started and listening on PORT ${server.address().port}`));
