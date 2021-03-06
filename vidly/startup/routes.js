const express = require('express');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const customers = require('../routes/customers');
const users = require('../routes/users');
const auth = require('../routes/auth');
const rentals = require('../routes/rentals');
const home = require('../routes/index');
const error = require('../middleware/error');
const logger = require('../middleware/logger');
const morgan = require('morgan');
const returns = require('../routes/returns');
const startupDebugger = require('debug')('app:startup');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  
  app.use('/', home);
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/rentals', rentals);
  app.use('/api/returns', returns);
  
  app.use(logger);

  if (app.get('env') === 'development') {
    // console.log('Enabling morgon');
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
  }

  app.use(function(req, res, next) {
    startupDebugger('Authenticating... ', req.url);
    next();
  });
  
  app.use(error);

}