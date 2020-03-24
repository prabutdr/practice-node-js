// Asynchronous
console.log('Before');
getUser(1, displayUserAndRepos);
console.log('After');

function displayUserAndRepos(user) {
  console.log('User', user);
  getRepositories(user.gitHubUsername, displayRepos);
}

function displayRepos(repos) {
  console.log('User repos', repos);
}

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