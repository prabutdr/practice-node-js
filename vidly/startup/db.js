const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to DB'))
  // .catch(err => console.log('DB connection failed', err.message));
}