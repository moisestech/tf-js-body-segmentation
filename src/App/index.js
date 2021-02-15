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

export default function App() {
  let project_name = "Tensorflow.js React Body Segmentation";

  return (  
    {console.log(project_name)}
  )
}

// https://www.youtube.com/watch?v=KAaXbGr9o0s
// https://github.com/nicknochnack/RealTimeBodySegmentation
