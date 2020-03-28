const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();

// throw new Error('Something failed during startup');
// const p = Promise.reject(new Error('Something failed in Promise!'));

app.set('view engine', 'pug');
app.set('views', './views'); // default


// Start and listening the port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening port ${port}...`));

module.exports = server;