// 1. Install dependencies
// 2. Import dependencies
// 3. Setup webcam and canvas
// 4. Define references to those
// 5. Load handpose
// 6. Detect function
// 7. Draw using drawMask

import React, { useRef, useState, useEffect } from 'react';

// access to webcam
import Webcam from 'react-webcam';

// for running object detection
import * as tf from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';

// init dims
let initDims = {
  width: 0,
  height: 0,
};

export default function App({
  project_name = 'Tensorflow.js React Body Segmentation',
}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // load model
  const runBodySegment = async () => {
    const net = await bodyPix.load();
    console.log('Bodypix model loaded!');

    // trigger inference near real-time
    setInterval(() => {
      detect(net);
    }, 100);
  };

  // ingests video/model data
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoHeight = video.videoHeight;
      const videoWidth = video.videoWidth;

      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make detections
      const person = await net.segmentPersonParts(video);
      console.log(person);

      // Draw detections
      const coloredPartImage = bodyPix.toColoredPartMask(person);

      bodyPix.drawMask(
        canvasRef.current,
        video,
        coloredPartImage,
        0.7,
        0,
        false
      );
    }
  };

  // invoke model
  runBodySegment();

  return (
    <div className="App">
      <h1>{project_name}</h1>
      <header>
        {/* where one intakes data for tfjs  */}
        <Webcam ref={webcamRef} className="react-webcam" />

        {/* where one draws the segmentation layer */}
        <canvas ref={canvasRef} className="react-canvas" />
      </header>
    </div>
  );
}
