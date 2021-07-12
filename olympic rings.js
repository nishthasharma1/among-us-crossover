// List p5 functions below so glitch will recognize them
/* global createCanvas, background, ellipse, rect, fill, noFill
stroke, strokeWeight, arc, HALF_PI, PI, QUARTER_PI, TWO_PI, line
*/

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

// Name: Nishtha Sharma, partner: Aldo Ruiz

function setup(){
  // Code here runs only once
  //800,600
  createCanvas(800, 6000);
}

function draw (){
  // fill(R, G, B)
  //Blue Ellipse
noFill();
  stroke(0,0,200);
  strokeWeight(10);
  // ellipse(x-coordinate, y-coordinate (upside down), x-width, y-width)
  ellipse(75, 100, 100, 100);

  
//Black Ellipse
noFill();
  stroke (0,0,0);
  strokeWeight(10);
  ellipse(190,100,100,100);
  
// Orange Ellipse 
  noFill();
    stroke(255,140,0)
    strokeWeight(10);
    ellipse(125,160,100,100);
  
//Green Ellipse
noFill();
  stroke(0,128,0);
  strokeWeight(10);
  ellipse(250 , 160, 100, 100);
//Red Ellipse
noFill();
  stroke(178,34,34);
  strokeWeight(10);
  ellipse(305,100,100,100);
  
noFill();
  stroke(0,128,0);
  strokeWeight(10);
  ellipse(250 , 160, 100, 100);
  
  
  
 //Instagram Logo
fill(0,0,0);
strokeWeight(0);
rect(130, 250, 150, 150, 20);
  
//Square
noFill();
stroke(255,255,255);
strokeWeight(10);
rect(155, 275, 100, 100, 20);

//circle
  stroke(255,255,255);
  ellipse(205,323,50,50);
  
//smaller ciricle
  strokeWeight (0);
  fill(255,255,255);
  ellipse(235,295,15, 15);
  
  
// Dominos Logo
  
// Left Red Square
fill(255, 0, 0);
rect(110,490,200,100, 20);
  
//Blue Square
fill(70,130,180);
rect(110,600,200,100,20);

//two circles on the left
fill(255,255,255,255)
  ellipse(150,550,25,25)
}

//line
fill(0,0,0);
line(100,100, 100, 100);
  
 /* 
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
  */


