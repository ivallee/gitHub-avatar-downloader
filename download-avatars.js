// .env config
require('dotenv').config();
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const request = require('request');
const fs = require('fs');

// Command line arguments
const owner = process.argv[2];
const repo = process.argv[3];

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

  request(options, (err, response, body) => {
    const content = JSON.parse(body);
    cb(err, content);
  });
}

// Downloads URL and writes to specified path
function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', (err) => {
      throw err;
    })
    .on('response', (response) => {
      console.log(`Downloaded image to: ${filePath}`);
    })
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, (err, result) => {
  console.log("Errors:", err);
  // Checks for arguments from command line
  if (!owner || !repo) {
    console.log("Please enter a valid repo owner and repo name");
  } else {
    for (var i = 0; i < result.length; i++) {
      const url = result[i].avatar_url;
      const name = result[i].login;
      downloadImageByURL(url, `./avatars/${name}.jpg`);
    }
  }
});