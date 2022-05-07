Google Computer Science Summer Institute// List p5 functions below so glitch will recognize them
/* global createCanvas, background, colorMode, HSB, noStroke, color, fill, ellipse,
text, stroke, line, width, height, mouseX, mouseY, key
createSlider, createButton, quad, rect, triangle, strokeWeight, circle, 
*/


// Name: nishtha sharma

// We'll use variables for most of our colors in this code-along.
// Below are variables WE are defining, not those defined by p5 (included at the top)
let backgroundColor, color1, color2, textColor, globalS, globalB, mode, button, lampOn;
let carOn;

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 355, 60 , 110);
  noStroke();

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  backgroundColor = color(80);
  textColor = color(20);
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  globalS = 80;
  globalB = 80;
  color1 = color(0, globalS, globalB);
  color2 = color(200, globalS, globalB);
  backgroundColor = color(200, 30, globalB);
  
  // keeps track of whether the streetlight is on
  lampOn = true;
 // headlights = true;

}

function draw() {
  background(backgroundColor);
  
  //draw the road
  fill(color(20));
  quad(0,height, 0, height-80, width, height-80, width, height);
  
  // draw a lamp with a button
  drawLamp(width/2,lampOn);
  
  drawcar(width/3);
}

function drawLamp(x,isOn){
  // x is the x-coordinate of the lamp, isOn is a boolean (true/false) indicating whether to draw the bulb on

  // lamp post
  fill(color(20));
  rect(x-5,150,10,200);
  
  // light bulb with on/off control
  if (isOn) {
    fill(color(50,70,100));
  } else {
    fill(color(50,40,60));
  }
  ellipse(x,150,25);
    
  // lamp hat
  fill(color(20));
  triangle(x, 120, x + 15, 145, x-15, 145);

}

function drawcar(x, isOn){
  //bodies
  fill(28);
  rect(x-150, height-165, 200, 55);
  rect(x-125, height-220, 150, 55);
  
  //tires
  strokeWeight(10);
  stroke(0);
  fill(0);
  circle(180, height-110, 50);
  circle(50, height-110, 50);
  
  //window#1
  strokeWeight(2)
  stroke(1);
  fill('white');
  rect(x-120,height-210,60,40);

  //window#2
  strokeWeight(2)
  stroke(1);
  fill('white');
  rect(x-40,height-210,60,40);
  
  //front headlight --- this is what i want for the function to work like the lamp
  fill('yellow');
  strokeWeight(2);
  stroke(51)
  circle(220,height-150,20);
  
  //back headlight
  fill('red');
  stroke(20)
  rect(x-150,height-160, 30, 20);
}

function lampSwitch() {
  if (lampOn) {
    lampOn = false;
  } else {
    lampOn = true;
  }
} 
// headlights is not defined ------

//function headlights { 
  //if (lampOn) {
    //headlights = false;
  //} else {
    //headlights = true;
  //}
//}

function mousePressed() {
    lampSwitch();
   // headlights()
}

