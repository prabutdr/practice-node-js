const EventEmitter = require('events');

const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', e => {
  console.log('Listener called.', e);
});

// Raise an event
emitter.emit('messageLogged', { id: 1, url: 'http://' });
 