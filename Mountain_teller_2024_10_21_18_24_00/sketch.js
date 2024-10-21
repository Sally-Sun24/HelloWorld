let rabbitProperties = {
  "name" : "rabbit",
  "shape" : "bunny",
  "color" : [255, 255, 255],
  "age" : 0,
  "posX" : 0,
  "posY" : 0,
  "size" : 50,
  "healthy" : 1,
  "happy" : 0,
  "tired" : 0,
  "hunger" : 0,
  "mood" : 1
}

// 兔子相关的游戏状态
let gamestate = "none"; // menu, mainLoop, changingDay, gameover

// 用来跟踪游戏中的时间
let cDay, cMonth, cYear, cHour, cMinute, cSecond, cMillis;
let gameDaysPassed = 0;
let resetTime = 0;
let lengthOfDay = 60000;
let timeLeftInDay;
let formattedTimeString;

// 颜色
let darkG = "#081820";
let oliveG = "#346856";
let limeG = "#88c070";
let seaG = "#e0f8d0";

// 按钮
let feedButton, playButton, sleepButton;

// 胡萝卜
let hasFood = false;
let foodX = 0;
let foodY = 0;

function setup() {
  createCanvas(320, 160);
  getCurrentTime();
  generateRabbit();
  noStroke();

  // 让兔子从中心开始
  rabbitProperties["posX"] = width / 2;
  rabbitProperties["posY"] = height / 2;

  // 喂食按钮
  feedButton = createButton('feed');
  feedButton.position(width / 2 - 60, height - 30);
  feedButton.style('font-family', 'Comic Sans MS');
  feedButton.style('font-size', '10px');
  feedButton.mousePressed(feedRabbit);

  // 玩耍按钮
  playButton = createButton('play');
  playButton.position(width / 2 - 10, height - 30);
  playButton.style('font-family', 'Comic Sans MS');
  playButton.style('font-size', '10px');
  playButton.mousePressed(play);

  // 睡觉按钮
  sleepButton = createButton('sleep');
  sleepButton.position(width / 2 + 35, height - 30);
  sleepButton.style('font-family', 'Comic Sans MS');
  sleepButton.style('font-size', '10px');
  sleepButton.mousePressed(sleep);
}

function draw() {
  background(seaG);

  drawUI();

  moveRabbit();
  drawRabbit();

  // 画食物（胡萝卜）
  if (hasFood) {
    drawFood();
  }

  checkCollisionWithFood();
}

function drawUI() {
  fill(oliveG);
  rect(0, 0, width, 20);
  fill(darkG);
  textAlign(RIGHT);
  fill(seaG);
  text(formattedTimeString, width - 10, 15);
  textAlign(LEFT);
  fill(seaG);
  text("Age: " + rabbitProperties["age"], 10, 15);
  text("Healthy: " + rabbitProperties["healthy"], 50, 15);

  timeLeftInDay = lengthOfDay - (cMillis - resetTime);
  let mappedTime = map(timeLeftInDay, lengthOfDay, 0, 0, width);
  fill(darkG);
  rectMode(CORNER);
  rect(0, height - 5, mappedTime, 5);
}

function gameOver() {
  noLoop();
  textAlign(CENTER);
  textSize(32);
  text("GAME OVER", width / 2, height / 2) + 5;
}

function play() {
  if (rabbitProperties["mood"] < 4) {
    rabbitProperties["mood"] += 1;
  }

  console.log("current mood: " + rabbitProperties["mood"]);
  console.log("play... coming soon!");
}

function sleep() {
  // 睡觉时增加健康值和情绪，并模拟一段时间的休息
  if (rabbitProperties["healthy"] < 4) {
    rabbitProperties["healthy"] += 1;
  }
  if (rabbitProperties["mood"] < 4) {
    rabbitProperties["mood"] += 1;
  }
  console.log("The rabbit is sleeping...");
}

function feedRabbit() {
  if (!hasFood) {
    hasFood = true;
    foodX = random(50, width - 50);
    foodY = random(50, height - 50);
    console.log("Feeding the rabbit...");
  }
}

function newDay() {
  gameDaysPassed += 1;
  rabbitProperties["age"] = gameDaysPassed;
}

function getCurrentTime() {
  cDay = day();
  cMonth = month();
  cYear = year();
  cHour = hour();
  if (cHour >= 12) cHour = cHour - 12;
  if (cHour == 0) cHour = 12;
  cMinute = minute();
  cSecond = second();
  cMillis = floor(millis());

  if (cMillis >= resetTime + lengthOfDay) {
    resetTime = floor(millis());
    newDay();
  }

  formattedTimeString = cMonth + "/" + cDay + "/" + cYear;
}

function drawRabbit() {
  fill(rabbitProperties["color"]);
  ellipse(rabbitProperties["posX"], rabbitProperties["posY"], rabbitProperties["size"], rabbitProperties["size"] - 20);
}

function moveRabbit() {
  rabbitProperties["posX"] += random(-2, 2);
  rabbitProperties["posY"] += random(-2, 2);
  rabbitProperties["posX"] = constrain(rabbitProperties["posX"], 50, width - 50);
  rabbitProperties["posY"] = constrain(rabbitProperties["posY"], 50, height - 50);
}

function drawFood() {
  fill(limeG);
  ellipse(foodX, foodY, 10, 10);
}

function checkCollisionWithFood() {
  if (dist(rabbitProperties["posX"], rabbitProperties["posY"], foodX, foodY) <= 10) {
    if (rabbitProperties["healthy"] < 4 && hasFood) {
      rabbitProperties["healthy"] += 1;
      rabbitProperties["mood"] += 1;
      hasFood = false;
      console.log("Rabbit ate the carrot!");
    }
  }
}
