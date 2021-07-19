// List p5 functions below so glitch will recognize them
/* global createCanvas, background, colorMode, HSB, noStroke, color, fill, ellipse,
text, stroke, line, width, height, mouseX, mouseY, tint, key, textSize, strokeCap, image, loadImage, strokeWeight, xpos, ypos,frameRate

createSlider, createButton, quad, rect, triangle, random, collideCircleCircle
*/

// Name: Nishtha Sharma Partner: Andrew Elysee

// Below are variables WE are defining, not those defined by p5 (included at the top)
let brushHue,
  val,
  backgroundColor,
  coinX,
  coinY,
  backimg,
  score,
  time,
  start,
  gameIsOver,
  hit,
  ballC,
  cursorC,
  slider;

function setup() {
  // Canvas & color settings
  frameRate(100);
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX = random(width);
  coinY = random(height);
  time = 1800;
  gameIsOver = false;
  score = 0;
  hit = false;
  textSize(16);
  backimg = loadImage("https://cdn.glitch.com/b28f9f34-7c1c-4f52-9f45-d778c924a5ae%2Fbeedog.png?v=1626705741820");
  ballC = random(0, 360);
  cursorC = random(0, 360);
  slider = createSlider(10, 100, 100);
  slider.position(20, 410);
  slider.style("width", "370px");
  start = false;
}

function draw() {
  val = slider.value();
  //background(backgroundColor);
  tint(val);
  image(backimg, 0, 0, 400, 400);
  //background(val);
  fill(ballC, 100, 100);
  ellipse(coinX, coinY, 20);
  fill(cursorC, 100, 100);
  ellipse(mouseX, mouseY, 20);
  if (val < 50) {
    fill(100);
  } else {
    fill(0);
  }
  textSize(15);
  text(`Time remaining: ${Math.ceil(time / 60)}`, 20, 40);
  // Display score
  text(`Score: ${score}`, 250, 40);

  handleTime();

  // If game is over, display text.
  if (gameIsOver) {
    background("#F08080");
    fill("black");
    text("GAME OVER", 150, 200);
    fill("black");
    text("Click to try again?", 140, 250);
  } else if (!start){
    background(0)
    fill(100)
    textSize(30)
    text("Click to Start!", 100, 200)
  } else {
    // Check whether there is a collision
    // true when circle (mouseX, mouseY, 20) collides with circle (coinX, coinY, 20)
    hit = collideCircleCircle(mouseX, mouseY, 20, coinX, coinY, 20);
    //text(`Collision: ${hit}`, 20, 60);
    if (hit && start) {
      handleCollision();
    }
  }
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.

  // Update score
  score += 1;

  // Move coin to new random location
  coinX = random(width);
  coinY = random(height);
  ballC = random(0, 360);
  cursorC = random(0, 360);
}

function handleTime() {
  // We'll write code to handle the time.
  if (start) {
    if (time <= 0) {
      gameIsOver = true;
    } else {
      time -= 1;
    }
  }
}

//restart game
function mousePressed() {
  if (gameIsOver) {
    time = 1000;
    gameIsOver = false;
    score = 0;
    start = false;
  } else {
    start = true;
  }
}
