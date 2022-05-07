// List p5 functions below so glitch will recognize them
/* global createCanvas, background, colorMode, HSB, noStroke, color, fill, ellipse,
text, stroke, line, width, height, mouseX, mouseY, rect, circle, strokeWeight, triangle
*/


// Name: Irene Liao, partner: Nishtha Sharma

// We'll use variables for most of our colors in this code-along.
// Below are variables WE are defining, not those defined by p5 (included at the top)
let backgroundColor, color1, color2, textColor, globalS, globalB;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  backgroundColor = color(95);
  textColor = color(20);
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  globalS = 50;
  globalB = 50;
  color1 = color(0, globalS, globalB);
  color2 = color(200, globalS, globalB);
}

function drawCar() {
  //body car
  fill(20);
  rect(150, 350, 250, 55);
  rect(170, 300, 200, 55);
  
  //tires
  strokeWeight(12);
  stroke(25);
  fill(100);
  circle(200, 410, 50);
  circle(340, 410, 50);
  
  //window#1
  strokeWeight(2)
  stroke(1);
  fill('white');
  rect(190,315,70,40);
  
  //door
  fill('black');
  rect(268,303, 5, 100)

  //window#2
  strokeWeight(2)
  stroke(1);
  fill('white');
  rect(280,315,70,40);
  
  //front headlight
  fill('yellow');
  strokeWeight(2);
  stroke(51)
  circle(4*width/5,3*height/4,20);
  
  //back headlight
  fill('red');
  stroke(20)
  rect(151,351, 30, 20);
}

function drawDayBuildings()
{
   //buildings
  fill('black');
  rect(10, 100, 125, 400);
  
  //building#2
  fill('black');
  rect(300, 100, 125, 400);
  
  //building#3
  fill('black');
  rect(150, 70, 128, 400);
  
  //road
  fill('gray');
  rect(0, 430, 500, 100);
  
  //road lines
  fill('yellow')
  rect(0, 450, 100, 20);
  rect(400, 450, 100, 20);
  rect(200, 450, 100, 20);
}

function drawNightBuildings()
{
 //buildings
  fill('yellow');
  rect(10, 100, 125, 400);
  
  //building#2
  fill('yellow');
  rect(300, 100, 125, 400);
  
  //building#3
  fill('yellow');
  rect(150, 70, 128, 400);
  
  //road
  fill('gray');
  rect(0, 430, 500, 100);
  
  //road lines
  fill('yellow')
  rect(0, 450, 100, 20);
  rect(400, 450, 100, 20);
  rect(200, 450, 100, 20);
}

function draw() {
  background(backgroundColor);
  drawCenterLine();

  //Grey circle & text:
  fill(textColor);
  // mouseX, mouseY
  ellipse(mouseX, mouseY, 50);
  text("Flip the switch", 20, 20); 
  
  if (mouseX > width/2)
  {
    nightMode();
  }
  else
  {
    dayMode();
  }
}

function nightMode() {
    textColor = color(80);
    text("Night mode", 3*width/4, 20);
    backgroundColor = color(5);
    globalB = 30;
    color1 = color(0, globalS, globalB);
    color2 = color(200, globalS, globalB);
  
    drawNightBuildings();
    drawCar(); 
}

function dayMode() {
    textColor = color(20);
    text("Day mode", width/4, 50);
    backgroundColor = color(196,226,237);
    globalB = 50;
    color1 = color(0, globalS, globalB);
    color2 = color(200, globalS, globalB);
    
    drawDayBuildings();
    drawCar();
}

function drawCenterLine()
{
  // "width" is a built-in variable for width of canvas
  // "height" is a built-in p5 variable for the height of the canvas
  stroke(textColor);
  //fill(0)
  line(width/2, 0, width/2, height);
  noStroke();
}