const request = require('request');
const fs = require('fs');

const GITHUB_USER = "ivallee";
const GITHUB_TOKEN = "1dd1219e875ed6dd517c857ebd87bbc26eb169f8";

console.log('Welcome to the GitHub Avatar Downloader!');

// Accesses repo contributors
function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  const options = {
      url: requestURL,
      headers: {
        'User-Agent': 'Student project - github avatar downloader'
      }
  };

  request(options, function (err, response, body){
    const content = JSON.parse(body);
    cb(err, content);
  })
}

// Downloads URL and writes to specified path
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Downloaded image to: ' + filePath);
  })
  .pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  // Loops through contributor array and calls image downloader
  console.log("Errors:", err);
  console.log("Result:", result);
  for (var i = 0; i < result.length; i++) {
      const url = result[i].avatar_url;
      const name = result[i].login;
      downloadImageByURL(url, './avatars/' + name + '.jpg');
    }
});