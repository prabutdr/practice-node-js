require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')

module.exports = function() {
  // process.on('uncaughtException', (ex) => {
  //   console.log('We got uncaught exception');
  //   winston.error(ex.message, ex);
  //   // process.exit(1);
  // });

  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPring: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log'
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

}