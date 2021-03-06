Hosted application: https://leetracer.herokuapp.com/ 

Make sure you have Node.js installed.

## Running Project
The following commands are in the package.json for reference:
#### Install dependencies into /node_modules
```
npm install
```
#### Start project on localhost:3000
```
npm start
```

#### Triggering Build
Pushing code to any branch will trigger a build pipeline for that branch, and the result of the build will be shown next to the most recent commit label. 
Pushing code to the main branch will trigger the both the build jobs and the deploy jobs for the pipeline, resulting in deployment to production environment if the build succeeds.

#### .env File
Both the frontend and backend rely on a .env file with various secrets and API keys. The .env files are not checked into version control. If you require the .env, contact a contributor to this repo for a copy.
