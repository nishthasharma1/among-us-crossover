// CSSI Day 9: Bravia Balls
// Group members: ___, ____

/*
global createCanvas, gravity, windowWidth, windowHeight, colorMode, HSB, background, random, width, height, fill, noStroke, ellipse
*/

/*
WARNING: Code here is substantially different from curriculum page.

GOAL: Refactor this code to use OOP principles
- Define a CLASS called BouncyDot
- BouncyDots have all necessary PROPERTIES to 
  define a dot's position, hue, speed...
- Replace tasks 1, 2, 3 with METHODS
- Make code clean and readable
*/

/* 
  Todo:
    1. Make the balls bounce with gravity
*/


let dots;


function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);

  // 1. Initializing array of many dots
  dots = [];
  // Using a for loop, push new dot into array
  for (let i = 0; i < 50; i++) {
    dots.push(new BouncyDot());
  }
}

function draw() {
  background('black');
  for (let dot of dots) {
    // 2. Move the dots
    dot.move();

    // 3. Draw the dots
    dot.paint();
  }
}

let gravity = 0.06;
class BouncyDot {
  constructor() {
    this.gravity = 0.3;
    this.speed = random(0, 10);
    this.x = random(20, width - 20);
    this.y = random(20, height - 20);
    this.r = random(5, 12); // radius
    this.hue = random(360); //color of the balls in a constant state
    this.xv = random(0.5, 3);
    this.yv = random(0.5, 3);
  }

  move() {
    // Update pos based on gravity with balls having different speeds
    this.y += this.speed;
    this.speed += gravity;

    if (this.y > windowHeight - 20) {
      this.speed = -0.8 * this.speed;
    }

    if (this.y > windowHeight - 20) {
      this.speed = -1.4 * random(1, 5);
    }

    //date position based on velocity
    this.x += this.xv;
    this.y += this.yv;
    //At left and right edges, relect x-velocity
    if (this.x - this.r <= 0 || this.x + this.r >= width) {
      this.xv *= -1; // multiplying by -1 flips sign
    }
    // // At top and bottom edges, reflect y-velocity
    if (this.y - this.r <= 0 || this.y + this.r >= height) {
      this.yv *= -1;
    }
    
    if (this.x <= windowWidth - 20){
  this.hue = random(360);
}
  }

  paint() {
    // Draw dot of the right hue as a circle
    fill(this.hue, 100, 100);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
    
  
  }
  
}


function mousePressed() {
  // We'll use this for console log statements only.
  const dot = dots[0];
  console.log(dot.x);
}
