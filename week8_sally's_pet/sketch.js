// Video
let video;

let label = 'waiting...';

let classifier;

// Step 1: Load the model
function preload() {
  console.log("Loading model...");
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5Iizaa7pp/model.json');
  console.log("Model loaded");
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // Step 2: Start classifying
  classifyVideo();
}

// Step 2: classify
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Step 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
  
  let emoji;
  
  if (label == 'Minji') {
    emoji = '💍'
  } else if (label == 'Rilakkuma') {
    emoji = '🐻'
  } else if (label == 'Sniff') {
    emoji = '🦘'
  } else if (label == 'sally') {
    emoji = '👩‍🍳'
  }
  textSize(100);
  text(emoji, width/2 + 230, height/6);
   }

// Step 3: Get the classification
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;  
  // Classify again
  classifyVideo();
}