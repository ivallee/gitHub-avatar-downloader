const request = require('request');
const fs = require('fs');
const arg1 = process.argv[2];
const arg2 = process.argv[3];

// Github info
const GITHUB_USER = "ivallee";
const GITHUB_TOKEN = "1dd1219e875ed6dd517c857ebd87bbc26eb169f8";

console.log('Welcome to the GitHub Avatar Downloader!');

// Accesses repo contributors
function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  const options = {
    url: requestURL,
    headers: {
      'User-Agent': 'Student project - github avatar downloader'
    }
  };

  request(options, function (err, response, body){
    const content = JSON.parse(body);
    cb(err, content);
  });
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


getRepoContributors(arg1, arg2, function(err, result) {
  console.log("Errors:", err);
  // Checks for arguments from command line
  if (!arg1 || !arg2) {
    console.log("Please enter a valid repo owner and rep name");
  } else {
    for (var i = 0; i < result.length; i++) {
      const url = result[i].avatar_url;
      const name = result[i].login;
      downloadImageByURL(url, './avatars/' + name + '.jpg');
    }
  }
});