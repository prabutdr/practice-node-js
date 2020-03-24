
const os = require('os');

console.log(os.arch());
console.log(os.EOL);
console.log(os.totalmem());
console.log(os.freemem());

console.log(`Total memory: ${os.totalmem()}`);