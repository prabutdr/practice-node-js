const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/index');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log('DB connection failed', err.message));


app.set('view engine', 'pug');
app.set('views', './views'); // default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(app.get('env'));

console.log('Application Name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
// console.log('Mail password: ' + config.get('mail.password'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

app.use(function(req, res, next) {
  startupDebugger('Authenticating... ', req.url);
  next();
});

app.use(logger);

// Start and listening the port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}...`));