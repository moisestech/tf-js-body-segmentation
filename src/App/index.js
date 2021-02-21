// 1. Install dependencies
// 2. Import dependencies
// 3. Setup webcam and canvas
// 4. Define references to those
// 5. Load handpose
// 6. Detect function
// 7. Draw using drawMask

import React, { useRef } from "react";

// access to webcam
import Webcam from "react-webcam";

// for running object detection
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/body-pix";

export default function App({project_name = "Tensorflow.js React Body Segmentation"}) {

  return (  
    <h1>{project_name}</h1>
  )
}

// video: https://www.youtube.com/watch?v=KAaXbGr9o0s
// code: https://github.com/nicknochnack/RealTimeBodySegmentation
// other blog: https://heartbeat.fritz.ai/body-segmentation-in-webcam-with-tensorflow-js-b455d6ed21b5