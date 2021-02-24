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

- App/index.js in `App()` component body.
  - connect canvas and webcam components with `useRef`.
  - `const webcamRef = useRef(null);`
  - `const camvasRef = useRef(null);`

## **5.** Load BodyPix Model

- App/index.js in `App()` component body.
  - The **bodyPix** model is pretrained saving an extra step.
  - Load the model using [ES7 async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
  - create a`const net` variable that `await bodyPix.load()`
    - this `net variable` will be passed to our **detect function** later on.
  - Immediately invoke `runBodysegment()` function once the model loads.

```javascript
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

     The **`const person`** variable holds the async/await result of the parameter **`net`**, which uses the method *`*sementPersonParts`* with the parameter **`video`**.

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

  8. Draw Detection Mask

     ```javascript
     ```

     
## **7.** Draw using drawMask

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

- **Webpack**: Module bundler.
- **webpack-cli**: is the interface we use to communicate with webpack.
- **webpack-dev-server**: info coming soon.

### Plugins

- **CopyWebpackPlugin**: info coming soon.
- **HtmlWebpackPlugin**: info coming soon.
- **CleanWebpackPlugin**: info coming soon.
- **UglifyPlugin**: info coming soon.

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
