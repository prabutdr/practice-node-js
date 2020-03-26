require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')
const error = require('./middleware/error');
const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/index');
const mongoose = require('mongoose');

const app = express();

// process.on('uncaughtException', (ex) => {
//   console.log('We got uncaught exception');
//   winston.error(ex.message, ex);
//   // process.exit(1);
// });

winston.handleExceptions(new winston.transports.File({
  filename: 'uncaughtExceptions.log'
}));

process.on('unhandledRejection', (ex) => {
  console.log('We got unhandled rejectes');
  winston.error(ex.message, ex);
  // process.exit(1);
});

winston.add(winston.transports.File, { filename: 'Logfile.log'});
winston.add(winston.transports.MongoDB, { 
  db: 'mongodb://localhost/vidly' ,
  level: 'error'
});

throw new Error('Something failed during startup');
// const p = Promise.reject(new Error('Something failed in Promise!'));

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
if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

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