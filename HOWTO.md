# HOW-TO

1. Installing body pix
2. Building the body pix app
3. Detecting segments in real time

## NPM

1. **Run App** `npm start`
2. Webpack Hot Reloading and ./dist directory bundling.

### npm start

- **scripts**: `npm start` runs scripts: `{ "start": "webpack serve"}`,
  - store your webpack commmands in package.json#scripts
  - alternatively run `npx webpack` or `node_modules/./bin/webpack`

## Package.JSON

### Packaging App

- **scripts**: `npm start` runs scripts: { "start": "webpack serve"},
- **main**: `webpack.config.js` is where webpack starts bundling from.

## WEBPACK HOW-TO

- **Webpack**: Module bundler.
- **webpack-cli**: is the interface we use to communicate with webpack.
- **webpack-dev-server**: info coming soon.

### Plugins

- **CopyWebpackPlugin**: info coming soon.
- **HtmlWebpackPlugin**: info coming soon.
- **CleanWebpackPlugin**: info coming soon.
- **UglifyPlugin**: info coming soon.

## BABEL HOW-TO

### Babel Loader
