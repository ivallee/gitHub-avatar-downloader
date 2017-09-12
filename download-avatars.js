const request = require('request');

const GITHUB_USER = "ivallee";
const GITHUB_TOKEN = "1dd1219e875ed6dd517c857ebd87bbc26eb169f8";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  const options = {
    url: requestURL,
    headers: {
      'User-Agent': 'Student project - github avatar downloader'
  }
};
  request.get(options)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      response.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
      })
          })

}

 getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
