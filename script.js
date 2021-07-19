// List p5 functions below so glitch will recognize them
/* global createCanvas, colorMode, HSB, strokeWeight, background, rect, mouseX, mouseY, stroke, fill, line, clear, text
 */

// Names: nishtha sharma, Nicole M.

/* TODO
x we need to leave a trail
x rainbow part
x rectangle is not right -> line
x cursor only shows when mouse pressed
x clear canvas when button is pressed
create a toggle 
make it be able to erase when toggle is turned on
*/

let brushHue;
let priorX, priorY;
let lineVisible, erasing;


function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeWeight(6);
  priorX = 0;
  priorY = 0;
  lineVisible = false;
  background(0);

  //Button
  rect(30, 20, 55, 55); 
  text("Eraser", 40, 50);
  fill(0, 102, 153);  

}

function draw() {
  chooseColors();
  strokeWeight(10);

  // If line is visible, draw line
  if (lineVisible) {
    line(priorX, priorY, mouseX, mouseY);
  }
  
  if (erasing){
  strokeWeight(20);
  stroke(0, 0, 0);
  line(priorX, priorY, mouseX, mouseY);
  }
  // Prepare for next loop
  priorX = mouseX;
  priorY = mouseY;
}

function chooseColors() {
  brushHue += 1;
  if (brushHue >= 360) {
    brushHue = 0;
  }
  stroke(brushHue, 50, 80); // is this in RGB color? 
  fill(brushHue, 50, 80);
}

function mousePressed() {
  lineVisible = true;
  // Button
  if (mouseX>30 && mouseX<85 && mouseY>20 && mouseY<75){ //Sets parameters to make stuff happen in the button region
    rect(60, 60, 50, 50); // This is just a test to make sure the button works
    erasing = true;}
  else{
    erasing = false; 
    draw();
  }

  }

function mouseReleased() {
  lineVisible = false;
}

function keyPressed() {
  //background(100);
  clear();
}
