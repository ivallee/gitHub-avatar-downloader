# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`


## PLEASE NOTE: avatars/ is included in the .gitignore

### To use:
-Install dotenv
-create .env file and include your github username and access token in the following format:
GITHUB_USER=your-username
GITHUB_TOKEN=your-token