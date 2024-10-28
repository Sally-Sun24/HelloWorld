let mouseXPos, mouseYPos;
let cheeseX, cheeseY;
let power = 0;
let powerIncreasing = true;
let powerBarMaxHeight = 100;
let gameStarted = false;
let targetY;
let gameWon = false;

let mouseImg, cheeseImg;
let mouseImgWidth = 50;
let mouseImgHeight;
let cheeseImgWidth = 50;
let cheeseImgHeight;

function preload() {
  // 预加载鼠标和奶酪图片
  mouseImg = loadImage('mouse.png');
  cheeseImg = loadImage('cheese.png');
}

function setup() {
  createCanvas(400, 600);

  // 计算鼠标和奶酪图片的高度以保持比例
  mouseImgHeight = (mouseImg.height / mouseImg.width) * mouseImgWidth;
  cheeseImgHeight = (cheeseImg.height / cheeseImg.width) * cheeseImgWidth;

  // 老鼠初始位置在屏幕底部中间
  mouseXPos = width / 2;
  mouseYPos = height - 20;

  // 随机生成奶酪的位置在竖直中心线上
  generateCheesePosition();
}

function draw() {
  background(220);

  // 绘制老鼠
  image(mouseImg, mouseXPos - mouseImgWidth / 2, mouseYPos - mouseImgHeight / 2, mouseImgWidth, mouseImgHeight);

  // 绘制奶酪
  image(cheeseImg, cheeseX - cheeseImgWidth / 2, cheeseY - cheeseImgHeight / 2, cheeseImgWidth, cheeseImgHeight);

  // 绘制力度条
  drawPowerBar();

  // 控制力度条的增长和循环
  if (keyIsPressed && key === ' ' && !gameWon) {
    updatePower();
  }

  // 如果游戏开始了，老鼠移动到目标高度
  if (gameStarted && !gameWon) {
    mouseYPos = lerp(mouseYPos, targetY, 0.1);

    // 检查老鼠是否到达目标高度
    if (abs(mouseYPos - targetY) < 1) {
      mouseYPos = targetY;
      gameStarted = false;
      checkWinCondition(); // 检查是否吃到奶酪
    }
  }

  // 如果游戏赢了，显示 "You Win!"
  if (gameWon) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
}

function drawPowerBar() {
  // 绘制力度条框
  noFill();
  stroke(0);
  rect(10, 10, 20, powerBarMaxHeight);

  // 绘制力度条的当前填充部分
  noStroke();
  fill(0, 255, 0);
  rect(10, 10 + powerBarMaxHeight - power, 20, power);
}

function updatePower() {
  // 根据 powerIncreasing 标志来控制力度条的循环
  if (powerIncreasing) {
    power += 2; // 调整增加速度
    if (power >= powerBarMaxHeight) {
      power = powerBarMaxHeight;
      powerIncreasing = false;
    }
  } else {
    power -= 2;
    if (power <= 0) {
      power = 0;
      powerIncreasing = true;
    }
  }
}

function keyReleased() {
  // 当松开空格键时，确定力度，计算目标高度
  if (key === ' ' && !gameWon) {
    gameStarted = true;
    targetY = map(power, 0, powerBarMaxHeight, height - 20, 0);
  }
}

function mousePressed() {
  // 点击左键重置游戏
  if (mouseButton === LEFT) {
    resetGame();
  }
}

function resetGame() {
  // 重置老鼠位置和游戏状态
  mouseYPos = height - 20;
  gameStarted = false;
  power = 0;
  powerIncreasing = true;
  gameWon = false;

  // 生成新的奶酪位置
  generateCheesePosition();
}

function generateCheesePosition() {
  // 奶酪在竖直中心线上随机生成
  cheeseX = width / 2;
  cheeseY = random(20, height - 20);
}

function checkWinCondition() {
  // 判断老鼠静止后是否与奶酪重合
  if (dist(mouseXPos, mouseYPos, cheeseX, cheeseY) < 10) {
    gameWon = true;
  }
}
