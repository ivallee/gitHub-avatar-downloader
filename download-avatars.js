const request = require('request');
const fs = require('fs');

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

  request(options, function (err, response, body){
    const content = JSON.parse(body);
    // Prints avatar URLS
    for (var i = 0; i < content.length; i++) {
      console.log(content[i].avatar_url);
    }
  })


}

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Response Message: ', response.statusMessage + "\n", response.headers["content-type"]);
    console.log('Download Complete');
  })
  .pipe(fs.createWriteStream(filePath));
}


downloadImageByURL('https://avatars0.githubusercontent.com/u/1615?v=4', './avatars/image.jpg');