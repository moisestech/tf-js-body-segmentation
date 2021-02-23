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
import * as bodyPix from "@tensorflow-models/body-pix";

export default function App({project_name = "Tensorflow.js React Body Segmentation"}) {
  
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  // load model
  const runBodySegment = async () => {
    const net = await bodyPix.load();
    console.log("Bodypix model loaded!");
  };
  
  // ingests video/model data
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState === 4
    )  {
      // Get video properties
      // Set video width and height
      // Set canvas width and height
      // Make detections
      // Draw detections
    }
  }

  // invoke model
  runBodySegment();

  return (  
    <div clasName="App">
      <h1>{project_name}</h1>
      <header>
        {/* where one intakes data for tfjs  */}
        <Webcam ref={webcamRef} className="react-webcam" />

        {/* where one draws the segmentation layer */}
        <Canvas ref={canvasRef} className="react-canvas" />
      </header>
    </div>
  )
}

// video: https://www.youtube.com/watch?v=KAaXbGr9o0s
// code: https://github.com/nicknochnack/RealTimeBodySegmentation
// other blog: https://heartbeat.fritz.ai/body-segmentation-in-webcam-with-tensorflow-js-b455d6ed21b5

// 12m 29s