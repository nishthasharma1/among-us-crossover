/* global createCanvas, colorMode, HSB, color, noStroke, fill, noFill, strokeWeight,
background, ellipse, text, stroke, line, globalS, globalB
width, height, mouseX, mouseY, rect, ellipse, random
mouseIsPressed, priorX, priorY, collideCircleCircle
keyCode, UP_ARROW, textSize, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, consol, collideRectCircle
drop1, drop2, drop, windowWidth, windowHeight, HSL, old_dots, Dot
sqrt, round,loadImage, backimg, image,createButton

partners: Nishtha Sharma, Liéla Pressley
to do:
- change background to wheres waldo - done
- have waldo picture to click on - done
- press button to change position of waldo to random position
-
*/

let backgroundColor, waldoPosition, rectPosition, mousePosition;
let introwaldo,
  waldo,
  startGame = false,
  GameOver = false;
function preload() {
  waldo = loadImage(
    "https://cdn.glitch.com/ba42119f-e489-47e1-8da5-b74badc27ba4%2Fwaldo.png?v=1627310237313"
  );
  introwaldo = loadImage(
    "https://cdn.glitch.com/ba42119f-e489-47e1-8da5-b74badc27ba4%2Fwaldo.png?v=1627315614738"
  );
  backimg = loadImage(
    "https://cdn.glitch.com/ba42119f-e489-47e1-8da5-b74badc27ba4%2Fwhere's%20waldo%20backgroud.jpeg?v=1627309058100"
  );
}

function setup() {
  // Canvas & color settings
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 100;

  // This variable contains a JSON object
  waldoPosition = {
    x: 100,
    y: 100
  };
  /* = {
    "x": 130,
    "y": 140
  }*/
  //start button
  button = createButton("start");
  button.mousePressed(start);
  button.position(270, 270);
}

function draw() {
  // statement for start of the game

  if (startGame == false) {
    background(0);
    image(introwaldo, 200, 80, 150, 140);

    fill(100);
    textSize(30);
    text(`Click start to play!`, 170, 250);
    // image(backimg, 0, 0, 600, 500);
    //  image(waldo, waldoPosition.x, waldoPosition.y, 20, 50);
  } else if (startGame == true) {
    button.position = (600, 500);
    background(100);
    image(backimg, 0, 0, 600, 500);
    image(waldo, waldoPosition.x, waldoPosition.y, 20, 50);
    //mouse position
    mousePosition = {
      x: mouseX,
      y: mouseY
    };

    // calculate the distance between the waldo and mouse

    let mouseDist = round(computeDistance(mousePosition, waldoPosition));
    text(`HINT: Waldo and your mouse is ${mouseDist} units apart.`, 200, 590);

    let category = computeCategoryOfDistance(mousePosition, waldoPosition);
    text(`Warmer/colder? ${category}`, 20, 590);
  }
}

//using distance equation computing distance of points
//point 1=waldo point 2=mouse
function computeDistance(point1, point2) {
  let answer = sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
  return answer;
}
//point 1=waldo point 2=mouse
function computeCategoryOfDistance(point1, point2) {
  // we can call other functions from inside this function
  let distance = computeDistance(point1, point2);
  if (distance < 100) {
    // hot
    strokeWeight(10);
    fill("black");
    textSize(15);
    text(`YOU FOUND WALDO! Click on the screen to play again!`, 100, 570);
    return "hot";
  } else if (distance < 200) {
    // medium
    strokeWeight(10);
    fill("black");
    textSize(15);
    text(`So close yet so far :(`, 20, 570);
    return "warm";
  } else {
    //cold
    strokeWeight(10);
    fill("black");
    textSize(15);
    text(`not even close...DON'T GIVE UP! :)`, 20, 570);
    return "cold";
  }
}

function mousePressed() {
  waldoPosition.x = random(width);
  waldoPosition.y = random(height - 150);
}
//function to start game (button)
function start() {
  startGame = true;
}
