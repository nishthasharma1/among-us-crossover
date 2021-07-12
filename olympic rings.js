// List p5 functions below so glitch will recognize them
/* global createCanvas, background, ellipse, rect, fill, noFill
stroke, strokeWeight
*/

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

// Name: elise, partner: fill in

function setup(){
  // Code here runs only once
  createCanvas(800, 600);
}

function draw(){
  // Code here runs continuously
  background(220);

  // fill(R, G, B)
  fill(200, 0, 200);
  stroke(0,0,0);
  strokeWeight(10);
  // ellipse(x-coordinate, y-coordinate (upside down), x-width, y-width)
  ellipse(150, 100, 20, 50);
  
  // stroke(R, G, B)
  stroke(255, 204, 0);
  // strokeWeight seems to make the line thicker?
  strokeWeight(4);
  noFill();
  rect(30, 20, 55, 55);
  

  // strokeWeight seems to make the line thicker?
  noFill();
  rect(300, 200, 55, 55);

}