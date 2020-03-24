// Asynchronous
console.log('Before');
getUser(1, (user) => {
  console.log('User', user);

  getRepositories(user.gitHubUsername, (repos) => {
    console.log('User repos', repos);
  });
});
console.log('After');

// Synchronous
console.log('Before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
console.log('After');


function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading user from a database...');
    const result = { id: id, gitHubUsername: 'prabu' };
    callback(result);
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Retrieving Git Hub repositories for user', username);
    callback(['repo1', 'repo2', 'repo3', 'repo4']);
  }, 1000);
}