# Helix Monorepo for Projects and Libraries
# READ THIS PLEASE BEFORE YOU DO STUFF.


### Run the following

- ##### Install lerna globally (Do once per machine)
`npm i -g lerna`

- ##### Start Developing
`npm run start-dev (from root)` 

- ##### if you want to clear out all your node modules (in child folders - remember to run lerna bootstrap again)
`lerna clean -y` 

- ##### Install dependencies for packages and create symlinks (runs prior to start-dev every time). Read more [here](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme)
`lerna bootstrap` 

- ##### HOW TO ADD DEPENDENCIES PROPERLY
`lerna add {INSERT NPM/YARN Package Name} packages/{PATH TO WHICH MICROSERVICE YOU WANT THIS TO INSTALL TO} {add -dev for dev dependencies}`
ex `lerna add react packages/library`
ex `lerna add someDevPackage packages/library -dev`
