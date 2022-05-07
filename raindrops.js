/* global createCanvas, colorMode, HSB, color, noStroke, fill, noFill, strokeWeight,
background, ellipse, text, stroke, line, globalS, globalB
width, height, mouseX, mouseY, rect, ellipse, random
mouseIsPressed, priorX, priorY, collideCircleCircle
keyCode, UP_ARROW, textSize, DOWN_ARROW, RIGHT_ARROW, LEFT_ARROW, consol, collideRectCircle
*/

let drop1x, drop1y, drop1d, drop1FallSpeed, drop1, drop2, drop3, drops, drop4;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  // Variables for droplet 1
  drop1 = {
    x: 200,
    y: 0,
    d: 10,
    fallSpeed: 8
  };
//  drop1x = 200; // or random(width)
//  drop1y = 0; // or random(height)
//  drop1d = 10; // or random(5,15)
//  drop1FallSpeed = 8; // or random(8, 20)
  // Variables for droplet 2
  drop2 = {
    x: random(width),
    y: random(height),
    d: random(5,15),
    fallSpeed: random(8,20)
  };
  drop3 = {
    x: random(width),
    y: random(height),
    d: random(5,15),
    fallSpeed: random(8,20)
  };
  drop4 = {
    x: random(width),
    y: random(height),
    d: random(5,15),
    fallSpeed: random(8,20)
  };
  drops = [
    drop1,
    drop2,
    drop3,
    drop4
  ];
}

function draw() {
  background(0, 0, 95);
  //// Code for droplet 1
  // Move droplet 1
  let drop = drops[0];
  drop.y += drop.fallSpeed;
  // If it goes off the screen...
  if (drop.y > height) {
    // ...reset it...
    drop.y = 0;
    // ...and move it somewhere random.
    drop.x = random(width);
  }
  // Display droplet 1
  noStroke();
  fill(60, 80, 80);
  ellipse(drop.x, drop.y, drop.d);
  //// Code for droplet 2
  // Code your next droplet here
  drop = drops[1];
  drop.y += drop.fallSpeed;
  // If it goes off the screen...
  if (drop.y > height) {
    // ...reset it...
    drop.y = 0;
    // ...and move it somewhere random.
    drop.x = random(width);
  }
  // Display droplet 2
  ellipse(drop.x, drop.y, drop.d);
  //// Code for droplet 3
  // Code your next droplet here
  drop = drops[2];
  drop.y += drop.fallSpeed;
  // If it goes off the screen...
  if (drop.y > height) {
    // ...reset it...
    drop.y = 0;
    // ...and move it somewhere random.
    drop.x = random(width);
  }
  // Display droplet 3
  ellipse(drop.x, drop.y, drop.d);
  // Code for droplet 4
  drop = drops[3];
  drop.y += drop.fallSpeed;
  // If it goes off the screen...
  if (drop.y > height) {
    // ...reset it...
    drop.y = 0;
    // ...and move it somewhere random.
    drop.x = random(width);
  }
  // Display droplet 4
  ellipse(drop.x, drop.y, drop.d);
}

function mousePressed() {
  // Right click on canvas, "inspect" then go to "console" tab to view this logging.
  console.log('Drop 1 x value:');
  console.log(drops[0].x);
  // Print statements don't show you which line the logging comes from.
  print('Drop 2 x value:');
  let drop = drops[1];
  print(drop.x);
  
  console.log('Drop 3 x value:');
  drop = drops[2];
  console.log(drop.x);
}