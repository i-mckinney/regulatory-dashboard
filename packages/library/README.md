# Helix Monorepo Component Library

### Run below commands to get started

- ##### Install dependencies of this project. Note it will only install dependencies mentioned in root package.json file
`npm install`
- ##### Install dependencies for packages and create symlinks. Read more [here](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme)
`lerna bootstrap` 
- ##### Launch Storybook for local view of web components
`npm run storybook`
- ##### Build Storybook for NPM Deployment
`npm run build`

To import into external app

- ##### Install this project. Supports Tree shaking
`npm i --save helixmonorepo-lib`

- #####  Since all items are bundled in the same file you can do any of these things currently
import { HelixButton } from "helixmonorepo-lib"
You can check the lib/index.js file for current exports.



`npm install`
