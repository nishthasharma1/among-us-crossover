// CSSI Day 12: Snake
// Group members: ___, ____

/*
global createCanvas, windowWidth, windowHeight, color, colorMode, HSB, background, random, width, height, fill, noStroke, ellipse
frameRate, text, stroke, noFill, rect, noStroke, round, keyCode, key, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,
collideRectRect
*/

let backgroundColor, playerSnake, currentApple, score, gameIsOver, currentBonus;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 90;
  frameRate(12);
  noStroke();
  
  // Set up initial values and initialize objects
  setupGame();
}

function draw() {
  background(backgroundColor);

  if (!gameIsOver) {
    // The snake performs the following four methods:
    playerSnake.move();
    playerSnake.draw();
    playerSnake.checkCollisions();
    playerSnake.checkApples();
    // The apple needs fewer methods to show up on screen.
    currentApple.draw();
    //
    //playerSnake.checkBonus();
    //currentBonus.draw();
  } else {
    fill(0);
    text("GAME OVER, press 'r' to replay", 50, 50);
  }
  
  fill(0);
  text(`Score: ${score}`, 20, 20);
}

function setupGame() {
  // Initial values
  score = 0;
  gameIsOver = false;
  // Initialize objects
  playerSnake = new Snake();
  currentApple = new Apple();
  //currentBonus = new Bonus();
}

function keyPressed() {
  console.log("key pressed: ", keyCode);
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  } else if (key === 'r') {
    setupGame();
  } else {
    console.log("wrong key");
  }
}

class Apple {
  //implemented apple class
  constructor() {
    this.size = 10;
    this.x = random(width-this.size); // width - 10 is on the canvas but not off it
    this.y = random(height-this.size);
    this.color = color(0,100,100);
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

/*class Bonus {
  //implemented Bonus score class
  constructor() {
    this.size = 12;
    this.x = random(width-this.size); // width - 10 is on the canvas but not off it
    this.y = random(height-this.size);
    this.color = random(360);
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}
*/
class TailSegment {
  // Implement TailSegment class
  constructor(x, y) {
    this.size = 10;
    this.x = x;
    this.y = y;
    this.color = color('green'); 
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Snake {
  constructor() {
    this.headX = width/2;
    this.headY = height - 10;
    this.size = 10;
    this.direction = 'N';
    this.stepSize = this.size + 2;
    // Initialized tail array
    this.tail = [new TailSegment(this.headX, this.headY)]; //ask more about this
  }

  move() {
    if (this.direction === "N") {
      this.headY -= this.stepSize;
    } else if (this.direction === "S") {
      this.headY += this.stepSize;
    } else if (this.direction === "E") {
      this.headX += this.stepSize;
    } else if (this.direction === "W") {
      this.headX -= this.stepSize;
    } else {
      console.log("Error: invalid direction");
    }
    // Add new TailSegment to the head, remove TailSegment from end
    this.tail.pop();
    this.tail.unshift(new TailSegment(this.headX, this.headY));
  }

  draw() {
    // Draw the head first
    // This place is the only area I want to use stroke (to draw a bigger head)
    //option1: use snake properties
    /*
    stroke(240, 100, 100);
    fill(240, 100, 100);
    rect(this.headX, this.headY, this.size, this.size);
    noStroke(); // remember to noStroke after
    */
    //option2: use tail segment properties
    let head = this.tail[0]; //head is a tailsegment object
    stroke(head.color);
    fill(head.color);
    rect(head.x, head.y, head.size, head.size);
    noStroke();
    
    // Drew other tail segments
    //this.tail.length
    for (let i = 1; i < this.tail.length; i++) {
      let seg = this.tail[i]; //seg is tailsegment objectc
      fill(seg.color);
      rect(seg.x, seg.y, seg.size, seg.size);
    }
  }

  checkApples() {
    // If the head of the snake collides with the apple,
    // make a new apple, increment the score
    if (collideRectRect(this.headX, this.headY, this.size, this.size, 
        currentApple.x, currentApple.y, currentApple.size, currentApple.size)){
      //make a new apple, increment the score
      currentApple = new Apple;  
      score += 1;
    
      // Add a new segment by duplicating whatever you find at the end of the tail.
      let end = this.tail[-1]; // end is the last tailsegment object in tail
      this.tail.push(end);
    }
  }
  /*
  checkBonus() {
    if (collideRectRect(this.headX, this.headY, this.size, this.size, 
        currentBonus.x, currentBonus.y, currentBonus.size, currentBonus.size)){
      //make a new apple, increment the score
      currentBonus = new Bonus;  
      score += 2;
    
      // Add a new segment by duplicating whatever you find at the end of the tail.
      let end = this.tail[-1]; // end is the last tailsegment object in tail
      this.tail.push(end);
    }
  }
*/
  checkCollisions() {
    // Canvas boundary check
    if ((this.headX < 0 || this.headX >= width) || 
        (this.headY < 0 || this.headY >= height)) {
      gameIsOver = true;
    }
    
    //Trigger game over when snake folds into itself, head colliding with body
    for (let i = 1; i < this.tail.length; i++){
      let seg = this.tail[i];
      if (collideRectRect(this.headX, this.headY, this.size, this.size,
                         seg.X, seg.Y, seg.size)){
        gameIsOver = true;
      
      }
    }
  }
}



