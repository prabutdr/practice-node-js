
// // console.log(exports);
// // console.log('Require ', require);
// // console.log('Module ', module);
// console.log(__filename);
// console.log(__dirname);

// const url = 'http://mylogger.io/log';

// function log(message) {
//   // Send an HTTP request
//   console.log(message);


// }

// // module.exports.log = log;
// // module.exports.endPoint = url;

// module.exports = log;

// // console.log(module);

const EventEmitter = require('events');

class Logger extends EventEmitter {
  log(message) {
    console.log('Logging', message);

    this.emit('messageLogged', { id: 1, url: 'http://' });
  }
}

module.exports = Logger;