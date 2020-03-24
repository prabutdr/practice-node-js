
const p = new Promise((resolve, reject) => {
   // Kick off some work
   // ...
  setTimeout(() => {
    // resolve(1); // pending => resolved, fulfilled
  //  reject(new Error('Error')); // pending => rejected
  }, 2000);
});


p
  .then(result => console.log('Result', result))
  .catch(error => console.error(error.message))
  .finally(() => {
    console.log('Promise End'); // not triggered
  });

console.log('The end');