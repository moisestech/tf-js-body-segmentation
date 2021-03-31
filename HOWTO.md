# HOW-TO

## **1.** Install dependencies

- Install Tensorflow Model Semantic segmentation and run segmentation in the browser (DeepLab).
- Full list of dependencies and devDependencies in [package.json]().

## **2.** Import dependencies

- App/index.js
  - `import * as bodypix` and `import * as tf`.
  - `import {useRef} from 'react'`. [useRef link](https://reactjs.org/docs/hooks-reference.html#useref)
    - help us reference our onscreen in DOM elements that keep state during the component lifecycle.

## **3.** Setup webcam and canvas

- App/index.js in `<header />` DOM element.
  - `<Webcam className="react-webcam"/>` return webcam component.
  - `<Canvas className="react-canvas" />` return canvas component.

## **4.** Define references to those

- App/index.js in **`App()`** component body.

  - connect canvas and webcam components with `useRef`.

  ```javascript
  // in App() body
  const webcamRef = useRef(null);
  const camvasRef = useRef(null);
  ```

## **5.** Load BodyPix Model

- App/index.js in **`App()`** component body.
  - The **bodyPix** model is pretrained saving an extra step.
  - Load the model using [ES7 async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
  - create a const **`net`** variable that **`await bodyPix.load()`**
    - this **`net`** variable will be passed to our **detect function** later on.
  - Immediately invoke **`runBodysegment()`** function once the model loads.

```javascript
// in App() body
const runBodySegment = async () => {
  const net = await bodyPix.load();
  console.log("Bodypix model loaded!)
}

runBodySegment();
```

## **6.** Detect function

- **Detect Function** loops through **bodyPix** output inference in near-realtime allowing **react-canvas component** to draw a segmentation with our **realtime webcam-react component**.
- **Detect Function** will run within our **runBodySegment** function.

  1. Check the data is available

     ```javascript
     // in Detect function
     if (
       typeof webcamRef.current !== "undefined" &&
       webcamRef.current !== null &&
       webcamRef.current.video.readyState === 4
     )
     ```

  2. Get video properties

     ```javascript
     // Get video properties
     const video = webcamRef.current.video;
     const videoHeight = video.videoHeight;
     const videoWidth = video.videoWidth;
     ```

  3. Set video width and height

     ```javascript
     // Set video width and height
     webcamRef.current.video.width = videoWidth;
     webcamRef.current.video.height = videoHeight;
     ```

  4. Set canvas width and height

     ```javascript
     canvasRef.current.width = videoWidth;
     canvasRef.current.height = videoHeight;
     ```

  5. Make detections

     The **`const person`** variable holds the async/await result of the parameter **`net`**, which uses the method **`*sementPersonParts`** with the parameter **`video`**.

     ```javascript
     const person = await net.segmentPersonParts(video);
     console.log(person);
     ```

  6. Connect Detect Function in runBodySegment

     Trigger inference near realtime in **runBodySegement** function.

     ```javascript
     setInterval(() => {
       detect(net);
     }, 100);
     ```

     Once, output is logging to the browser, the **person** variable will log and object with the confidence score, body part, and position.

     A total of 23 different points.

  7. Create Detection Mask

     Call the method **`bodyPix.toColoredPartMask`** with parameter **`person`**, which returns all of the detection masking data from the bodyPix.

     This masking data will be stored in model the **`coloredPartImage`**.

     ```javascript
     const coloredPartImage = bodyPix.toColoredPartMask(person);
     ```

## **7.** Draw using drawMask

```javascript
bodyPix.drawMask(canvasRef.current, video, coloredPartImage, 0.7, 0, false);
```

Pass **`drawMask`** paramets including the **canvasRef**, and **coloredPartImage**, opacity, blur, and flip image.

---

## NPM

1. **Run App** `npm start`
2. Webpack Hot Reloading and ./dist directory bundling.

### npm start

- **scripts**: `npm start` runs scripts: `{ "start": "webpack serve"}`,
  - webpack commmands are stored in package.json#scripts
  - alternatively run `npx webpack` or `node_modules/./bin/webpack`

---

## Package.JSON

### Packaging App

- **scripts**: `npm start` runs scripts: { "start": "webpack serve"},
- **main**: `webpack.config.js` is where webpack starts bundling from.

---

## WEBPACK HOW-TO

- [**Webpack**](https://www.npmjs.com/package/webpack): a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
- [**webpack-cli**](https://www.npmjs.com/package/webpack-cli): is the interface we use to communicate with webpack. webpack CLI provides a set of tools to improve the setup of custom webpack configuration.
- [**webpack-dev-server**](https://www.npmjs.com/package/webpack-dev-server): Use webpack with a development server that provides live reloading. This should be used for development only.
  - It uses [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) under the hood, which provides fast in-memory access to the webpack assets.

### Plugins

- [**CopyWebpackPlugin**](https://www.npmjs.com/package/copy-webpack-plugin): Copies individual files or entire directories, which already exist, to the build directory.
- [**HtmlWebpackPlugin**](https://www.npmjs.com/package/html-webpack-plugin): Plugin that simplifies creation of HTML files to serve your bundles.
- [**CleanWebpackPlugin**](https://www.npmjs.com/package/clean-webpack-plugin): A webpack plugin to remove/clean your build folder(s).
- [**UglifyPlugin**](https://www.npmjs.com/package/uglifyjs-webpack-plugin): This plugin uses [uglify-js](https://github.com/mishoo/UglifyJS) to minify your JavaScript.

---

## BABEL HOW-TO

### Babel Loader

### Babel Presets

- **@babel/preset-env**: info coming soon.
- **@babel/preset-react**: info coming soon.

### Babel Plugins

- **@babel/plugin-transform-runtime**: info coming soon.
- **@babel/plugin-proposal-pipeline-operator**: info coming soon.
- **@babel/plugin-syntax-dynamic-import**: info coming soon.

---

## TREE

- Install Tree with Homebrew using `brew install tree`
- To create dir structure `tree -I 'node_modules|package-lock.json|dist'`
