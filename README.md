# Tranlit Express

In lieu of being unable to successfully deploy Ember.js to Azure, I shift to using
ExpressJS as the MS docs use ExpressJS in the NodeJS deployment example.

## Running the Applicaiton

1. Go to the root directory and run ```npm install```
2. To run locally, run ```debug=myapp:* npm start```
3. Visit the website served on localhost:3000

### UI Packages

This application uses Material Design Components (MDC). The specific packages are in the ```package.json```.

Because I don't want to expose the ```node_modules``` folder, these modules are moved to the ```\public\plugin```
folder.
From there, we access MDC stylesheets and functionality in the view templates and stylesheets.
