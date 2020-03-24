// Async and Await approach
console.log('Before');
// getUser(1)
//   .then(user => getRepositories(user.gitHubUsername))
//   .then(repos => console.log('User repos', repos))
//   .catch(err => console.log('Error', err.message)); 

async function displayRepos() {
  const user = await getUser(1);
  const repos = await getRepositories(user.gitHubUsername);
  console.log('User repos', repos);
}
displayRepos();

console.log('After');


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading user from a database...');
      const result = { id: id, gitHubUsername: 'prabu' };
      resolve(result);
    }, 2000);
  });
}

function getRepositories(username) {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log('Retrieving Git Hub repositories for user', username);
  //     resolve(['repo1', 'repo2', 'repo3', 'repo4']);
  //   }, 1000);
  // });

  return ['repo1', 'repo2', 'repo3', 'repo4'];
}