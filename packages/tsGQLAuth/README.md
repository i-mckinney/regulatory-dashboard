# Helix Monorepo for Projects and Libraries
# READ THIS PLEASE BEFORE YOU DO STUFF.


### Run the following

- ##### Install dependencies to the highest level
`npm install` 

- ##### Install globally dependencies into system environment
`npm run ts-install`

- ##### Start Server
`npm start ` 

- ##### HOW TO ADD DEPENDENCIES PROPERLY
`lerna add {INSERT NPM/YARN Package Name} packages/{PATH TO WHICH MICROSERVICE YOU WANT THIS TO INSTALL TO} {add -dev for dev dependencies}`
ex `lerna add react packages/library`
ex `lerna add someDevPackage packages/library -dev`
