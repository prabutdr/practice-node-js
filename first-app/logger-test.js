
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', e => console.log('From Listener', e));

logger.log('Hi, How are you?');