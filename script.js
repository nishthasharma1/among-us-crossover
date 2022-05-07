// CSSI Day 9: Frogger
// Group members: ___, ____

/* global createCanvas, colorMode, HSB, random, width, height, background, fill, rect, ellipse, keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, textSize, text, collideRectCircle, myButton, new Clickable*/
/*
TODO
x fixed starting position for frog
x all arrow keys for frog
x move cars
x car reappears at random y
x display score
x reset location, increase score when reach yellow line
x reduce lives upon collision
x game over screen
x you win screen
----
BONUS
- timer
- car moves faster after score ^
- play again button

*/


let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V;
let hit1;
let myButton;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width/2;
  frogY = height-20;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
 // myButton = new Clickable();
}

function draw() {
  background(backgroundColor);
  
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  

  if (!gameIsOver) {
      moveCars();
      drawCars();
      checkCollisions();
      handleScore();
      checkEndGame();
  } else {
    // Display game over message if the game is over
    fill(0, 0, 0);
    if (score == 3) {
      text("YOU WIN", width/2, height/2);
      
      
    } else if (lives == 0) {
      text("GAME OVER", width/2, height/2);
    }
  } 
}

function tryAgain(){
    myButton.locate(150,230);
    myButton.draw();
    myButton.text = "Restart";       //Text of the clickable (string)
    myButton.textColor = "#000000";   //Color of the text (hex number as a string)
    myButton.textSize = 12;           //Size of the text (integer)
    myButton.textFont = "sans-serif"; //Font of the text (string)
    myButton.color = "#56E445"; 
    
    myButton.onPress = function(){
    score= 0;
    gameIsOver = false;   
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= 20;
  } else if (keyCode === DOWN_ARROW) {
    frogY += 20;
  } else if (keyCode === LEFT_ARROW) {
    frogX -= 20;
  } else if (keyCode === RIGHT_ARROW) {
    frogX += 20;
  }
}

function moveCars() {
  // Move the car
  car1X += car1V;

  // Reset if it moves off screen
  if (car1X > width) {
    car1X = 0;
    car1Y = random(50, height-60);
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, 
  // reset the frog and subtract a life.
  
  hit1 = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
  
  if (hit1) {
    lives -= 1;
    frogX = width/2;
    frogY = height-20;
  }
}

function handleScore() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  
  if (frogY < 50) {
    score += 1;
    frogX = width/2;
    frogY = height-20;
  }
  
  // Display info
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 40);
}


function checkEndGame() {
  // If lives is zero, game is over
  // If score is three, game is over
  if (lives == 0) {
    gameIsOver = true;
  } else if (score == 3) {
    gameIsOver = true;
  }
  
}
  
}