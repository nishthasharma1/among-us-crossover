// CSSI Day 13/14: CYOA, ML emojis
// Made following the tutorial here: https://www.youtube.com/watch?v=kwcillcWOg0

/*
global createCanvas, background, image, createCapture, VIDEO, textSize, textAlign, fill, text, CENTER, 
width, height, 
*/

// Video
let video;

let label = "waiting...";

let modelURL = "https://teachablemachine.withgoogle.com/models/xDB8pAglE/";
let classifier;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 30);

  let emoji = "⌨️";
  if (label == "puppy") {
    emoji = "🐶";
  } else if (label == "orange") {
    emoji = "🍊";
  } else if (label == "potato") {
    emoji = "🥔";
  }

  textSize(125);
  text(emoji, width - 150, height - 30);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}
