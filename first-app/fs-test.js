
const fs = require('fs');

const files = fs.readdirSync('./');
console.log(files);

fs.readdir('./t', function(err, files) {
  if (err) console.log('Error', err);

  console.log(files);
});

