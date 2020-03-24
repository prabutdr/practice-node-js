
console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

function getUser(id) {
  setTimeout(() => {
    console.log('Reading user from a database...');
    return { id: id, gitHubUsername: 'prabu' }
  }, 2000);
}

// Callbacks
// Promises
// Async/await