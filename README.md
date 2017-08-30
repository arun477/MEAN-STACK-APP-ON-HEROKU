# MEAN Stack

Technology used

* MongoDB
* Express
* Angular
* Node

*using mlab cloud server for it's mongodb database*

## Developing Notes

* `npm install` to resolve dependencies
* `npm install -g gulp` to install Gulp globally
* `npm run watch` to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js` which should be included by index.html
* Seed database: `mongoimport --db olympics-dev --collection sports --type json --file server/sports-seed.json --jsonArray --drop`

## About 
> This app is a code-schooL MEAN-STACK project.

## Live Site link
(https://cool-games.herokuapp.com)

*this app is hosted on heroku cloud platform*
