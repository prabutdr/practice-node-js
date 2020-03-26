const config = require('config');

module.exports = function() {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  // console.log(app.get('env'));
  
  console.log('Application Name: ' + config.get('name'));
  console.log('Mail server: ' + config.get('mail.host'));
  // console.log('Mail password: ' + config.get('mail.password'));
  if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }
}