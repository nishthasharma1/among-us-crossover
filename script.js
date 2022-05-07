// CSSI Day 10: Minigame (Paddle Ball turned Space Soccer!)
// Group members: Youssef Mikhail, 

/*
global windowWidth, windowHeight, createCanvas, frameRate, background, keyCode, UP_ARROW, DOWN_ARROW, stroke
   noFill, ellipse, rect, fill, key, keyIsDown, circle, collideRectCircle, random, tan, round,
   PI, textSize, text, delayTime, noLoop, redraw, loop, strokeWeight, 
   width, height, color, colorMode, HSB, RGB, loadImage, image, createImg, loadSound, collTimer, loadFont
   createGraphics, Button, textWidth, tint
   LEFT_ARROW, RIGHT_ARROW, line, noStroke, collideCircleCircle, collideRectRect, createButton, textFont 
*/

//modified

// link to slides with instructions: https://docs.google.com/presentation/d/12uvZfeyzI2_obwVHNCJHlLZN-Z1XU7YeXzajf2HlhkA/edit?resourcekey=0-t4U7QA1DlpdBGVzG4lT4tw#slide=id.ge532804646_0_33
// link to original starter code: https://glitch.com/edit/#!/paddle-game-starter
// link to starter code with classes: https://glitch.com/edit/#!/paddle-ball-starter-classes

let barWidth, barHeight, circleRadius, hit, hit2, hit3, hit4, hit5, borderSize;
let ball, player1, player2, p1img, p2img, avatarSize, gameIsOver;
let ballMinSpeed, ballMaxSpeed, bgimg, electimg, o2img, trashimg, buttonimg, boltimg, shroomimg, startScreen, endScreen;
let startButton, sbtnimg, pregame, startgame, endgame;
let hitSound, lobbytune, gametune, regularendtune; 
let myFont, collTimer, bar;
let startTitle, startTitle2;
let title1, title2, title3, title4, title5, title6;
let powerup;
let pupcdowntimer, pupcdown; //Power-Up cool down timer
let ballIsReset; //Tracks whether p-up has been hit off the resetBall or not
let p1hit, p2hit;
let electtimer, o2timer, trashtimer;
let o2rect, o2rectx, o2recty, o2recth;
let pupchoice;

function preload(){
  //Start stuff
  pregame = true;
  startgame = endgame = false;
  startScreen = loadImage('https://cdn.glitch.com/5039962e-7c03-4300-887c-6d2f3acb0a65%2Ftitle2.png?v=1628004608701');
  sbtnimg = loadImage('https://cdn.glitch.com/7cb6a114-eff7-41d3-b632-7730e8f070fc%2FEmergency_button.png?v=1628000596142');
  endScreen = loadImage('https://cdn.glitch.com/4aa913b0-dd90-4143-9e56-dbf58da50705%2Fregularendscreen.jpg?v=1628086390989');
  
  //Image Stuff
  bgimg = loadImage('https://cdn.glitch.com/7cb6a114-eff7-41d3-b632-7730e8f070fc%2FThe_Skeld_Cafeteria%20(1).png?v=1627997024074')
  p1img = loadImage('https://cdn.glitch.com/ef45aa94-e379-4ee8-9e48-e933efaa360f%2Famongus%20paddleball.gif?v=1627054422409')
  p2img = loadImage("https://cdn.glitch.com/ef45aa94-e379-4ee8-9e48-e933efaa360f%2Famongus%20paddleball%20flipped.gif?v=1627054426204");
  electimg = loadImage("https://cdn.glitch.com/7cb6a114-eff7-41d3-b632-7730e8f070fc%2Felectrical.png?v=1627918829245");
  o2img = loadImage("https://cdn.glitch.com/7cb6a114-eff7-41d3-b632-7730e8f070fc%2Fo2.png?v=1627918164048");
  trashimg = loadImage("https://cdn.glitch.com/946269f6-1fe0-4ce5-b541-4584c6adc790%2Ftrash.png?v=1628219221889");
  buttonimg = loadImage("https://cdn.glitch.com/7cb6a114-eff7-41d3-b632-7730e8f070fc%2F022e9179c1284896abcebc67ab6d2f3e%20(1).png?v=1627919989871");
  boltimg = loadImage("https://cdn.glitch.com/7cb6a114-eff7-41d3-b632-7730e8f070fc%2Flightning-bolt-thunder-bolt-lighting-strike-vector-32714355-removebg-preview.png?v=1627998601352");
  shroomimg = loadImage("https://cdn.glitch.com/946269f6-1fe0-4ce5-b541-4584c6adc790%2Fshroom.svg?v=1628218436880");
    
  
  //Sound stuff
  //ball hitting sound
  lobbytune = loadSound("https://cdn.glitch.com/946269f6-1fe0-4ce5-b541-4584c6adc790%2Fendscreen.mp4?v=1628090438177");
  gametune = loadSound("https://cdn.glitch.com/ad6d72a8-839a-4006-b27f-382b3e1712cf%2Fgametune.mp4?v=1628039780488");
  regularendtune = loadSound("https://cdn.glitch.com/ad6d72a8-839a-4006-b27f-382b3e1712cf%2Flobbytune.mp3?v=1628042386676");
  hitSound = loadSound("https://cdn.glitch.com/5039962e-7c03-4300-887c-6d2f3acb0a65%2Fponghit.wav?v=1628001996660");
  //background music
 // backgroundSound = loadSound("https://cdn.glitch.com/5039962e-7c03-4300-887c-6d2f3acb0a65%2FAmong%20Us.mp3?v=1628004307391")
  
  
  myFont = loadFont('https://cdn.glitch.com/ad6d72a8-839a-4006-b27f-382b3e1712cf%2FIn%20your%20face%2C%20joffrey!.otf?v=1628005919770');

}

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 50);
  colorMode(HSB, 360, 100, 100);
  //preload();
  
  gameIsOver = false;
  // barWidth = 15;
  // barHeight = 50;
  circleRadius = 20;
  frameRate(30);
  borderSize = 5;
  ballMinSpeed = 3;
  ballMaxSpeed = 5;
  avatarSize = width/10;
    
  ball = new Ball(width / 2, height / 2, 0, 100, 100, circleRadius*1.5);
  player1 = new Paddle(0, height / 2 - avatarSize / 2, "L");
  player2 = new Paddle(width - avatarSize, height / 2 - avatarSize / 2, "R");
  
  powerup = new Powerups(windowWidth/2 - avatarSize/2, windowHeight/2 - avatarSize/2);

  // TO DO extensions if you're bored hehe (in increasing order of difficulty):
  // - on the welcome screen allow each player to choose a color and tint the avatar accordingly
  // - instead of an invisible ellipse behind the characters (collideCircleCircle), make an invisible small wide rectangle behind the avatars feet so collideRectCircle can imitate a foot-kick
  // - add a single-player game option where the other side is just a machine that throws multiple balls to you simultaneously at random
    
  var btnW = windowWidth/5;
  var btnH = windowWidth/5;
  /*startButton = createImg('https://cdn.glitch.com/7cb6a114-eff7-41d3-b632-7730e8f070fc%2FEmergency_button.png?v=1628000596142');
  startButton.size(btnW, btnH);
  startButton.position(windowWidth/2 - btnW/2, windowHeight*3/4 - btnH/2);
  startButton.mousePressed(startGame);*/
  
  //text(`Player 1: ${player1Score}`, 20, 30);
  
  //fill('blue');
  //text(`Player 2: ${player2Score}`, 675, 30);
  
  collTimer = 0;
  lobbytune.setVolume(0.125);
  lobbytune.loop();
  
  p1hit = false;
  p2hit = false;
  
  pupcdown = true;
  pupcdowntimer = 0;
  
  ballIsReset = true;
  
  electtimer = o2timer = trashtimer = 0;
  
  o2rectx = 50;
  o2recty = 0;
  o2recth = windowHeight;
  pupchoice = 0;
}

function draw() {
  background(startScreen, windowWidth + 50, windowHeight - 50);
  
  //console.log(collTimer);
  
  textFont(myFont);
  
  if ((player1.score == 11 && player2.score < 11) || (player2.score == 11 && player1.score < 11)) {
    endgame = true;
    startgame = false;
  }
  
  if (pregame) {
    fill('white');
    textSize(windowWidth/20);
    startTitle = "AMONG US: TABLE TENNIS ROYALE";
    let titleW = textWidth(startTitle);
    if (windowWidth < 1000) {text('AMONG US: TABLE TENNIS ROYALE', windowWidth/2 - titleW/2, 50);} else {text('AMONG US: TABLE TENNIS ROYALE', windowWidth/2 - titleW/2, 70);}
    
    fill('blue');
    textSize(30);
    startTitle2 = "Press ENTER to start";
    let titleW2 = textWidth(startTitle2);
    if (windowWidth < 1000) {text('Press ENTER to start', windowWidth/2 - titleW2/2, 80);} else {text('Press ENTER to start', windowWidth/2 - titleW2/2, 100);}
    
    //if (!lobbytune.isLooping()) {lobbytune.loop();}
  }
  else if (startgame) {
    startGame();
    //startButton.hide();
  } else if (endgame) {
    endGame();
  }
  
}


function checkCollisions() {
  //TODO 3: use collide2D to check for collisions between either of the paddles and the ball
  // see Paddle.showSelf() for an explanation of the shift in coordinates
  hit = collideCircleCircle(player1.x+player1.size/2, player1.y+player1.size/2, player1.size, ball.x, ball.y, ball.r);
  hit2 = collideCircleCircle(player2.x+player2.size/2, player2.y+player2.size/2, player2.size, ball.x, ball.y, ball.r);
  hit3 = collideRectCircle(windowWidth/2 - 5, 0, 10, windowHeight, ball.x, ball.y, ball.r);
  
  if (!(trashtimer > 1)) {
    if (hit && collTimer == 0) {
      ball.stepX = random(ballMinSpeed, ballMaxSpeed);
      hitSound.play();
      collTimer++;
      ballIsReset = false;
    }
    if (hit2 && collTimer == 0) {
      ball.stepX = -1 * random(ballMinSpeed, ballMaxSpeed);
      hitSound.play();
      collTimer++;
      ballIsReset = false;
    }
    if (hit3 && collTimer > 0) {
      collTimer = 0;
    }
  }
}

function displayScores() {
  //stroke('white')
  fill("white");
  strokeWeight(10);
  textSize(30);
  text(`Player 1: ${player1.score}`, 10, 30);
  text(`Player 2: ${player2.score}`, width - 120, 30);
}

function keyPressed() {
  if (keyIsDown(13) && pregame) {
    startgame = true;
    pregame = false;
    startGame();
  } else if (keyIsDown(13) && endgame) {
    resetGame();
  }
}

function startGame() {
  pregame = false;
  startgame = true;
  
  //Elect stuff
  let poweruphit = collideRectCircle(powerup.x, powerup.y, avatarSize, avatarSize, ball.x, ball.y, ball.r);
  if (powerup.type == "elect" && poweruphit && electtimer == 0) {electtimer = 1;} else if (powerup.type == "elect" && !poweruphit && electtimer == 1) {electtimer = 0;}
  
  
  if (powerup.type == "elect" && !pupcdown && electtimer > 0 && electtimer < 500 && !ballIsReset) {powerup.activateSelf(); electtimer++;}
  else {
    background(bgimg, windowWidth + 50, windowHeight - 50);
    
    //o2 stuff
    if (powerup.type == "o2" && poweruphit && o2timer == 0) {
      o2timer = 1; 
      if (p1hit) {o2rectx = windowWidth/2;} else if (p2hit) {o2rectx = 0;}
    } else if (powerup.type == "o2" && !poweruphit && o2timer == 1) {
      o2timer = 0;
    }
    if (powerup.type == "o2" && !pupcdown && o2timer > 0 && o2timer < windowHeight && !ballIsReset) {powerup.activateSelf(); o2timer++; o2recty++; o2recth--;}
    
    
    //fill(0, 100, 100);
    //rect(0, 0, windowWidth/2, windowHeight/2);
    
    //trash stuff
    if (powerup.type == "trash" && poweruphit && trashtimer == 0) {trashtimer = 1;} else if (powerup.type == "trash" && !poweruphit && trashtimer == 1) {trashtimer = 0;}
    if (powerup.type == "trash" && !pupcdown && trashtimer > 0 && trashtimer < 500 && !ballIsReset) {powerup.activateSelf(); trashtimer++;}
    
    if (pupcdown) {pupcdowntimer++;}
    if (pupcdowntimer > 100) {pupcdown = false; pupcdowntimer = 100;}

    //console.log(pupcdown, ", ", pupcdowntimer);
    //console.log(ball.speed);

    stroke('white');
    bar = line(windowWidth/2, 0, windowWidth/2, windowHeight);
    noStroke();

    ball.saturation = 100;
    ball.brightness = 100;
    ball.showSelf();

    player1.showSelf();
    player1.moveSelf();
    player2.showSelf();
    player2.moveSelf();

    ball.moveSelf();

  }


  lobbytune.stop();
  regularendtune.stop();
  if (!gametune.isLooping()) {gametune.setVolume(0.125); gametune.loop();}

  //TODO 1: if the ball hits the floor or ceiling (the top or bottom of the canvas),
  //then the ball should move in the opposite direction
  displayScores();
  checkCollisions();
  checkWin();
  if (!pupcdown) {
    powerup.showSelf();
  }

  if (electtimer >= 500) {electtimer = 0; pupcdown = true; pupcdowntimer = 0;}
  if (o2timer >= windowHeight - avatarSize) {o2timer = 0; pupcdown = true; pupcdowntimer = 0;}
  if (trashtimer >= 500 || ball.x >= windowWidth - ball.r || ball.x <= 0) {trashtimer = 0; pupcdown = true; pupcdowntimer = 0;}
  //console.log(powerup.type);


  /*else if (powerup.type == "elect" && p2hit) {
    ellipse(player2.x+avatarSize/2, player2.y+avatarSize/2, avatarSize)
    player2.showSelf(); 
    player2.moveSelf();
  }*/

  if (ball.stepX > 0) {p1hit = true; p2hit = false;} else if (ball.stepX < 0) {p1hit = false; p2hit = true;}
  //console.log(p1hit);
  
  //console.log(pupchoice);
}


function endGame() {
    
    background(endScreen, windowWidth + 50, windowHeight - 50);
    fill("white");
    textSize(100);
    title1 = "GAME OVER";
    let titleW1 = textWidth(title1);
    text("GAME OVER", windowWidth/2 - titleW1/2, 150);
    fill("white");
  
    textSize(40);
    if (player1.score == 2 && player2.score < 2) {
      title2 = "Player 1 Won!";
      let titleW2 = textWidth(title2);
      text("Player 1 Won!", windowWidth/2 - titleW2/2, windowHeight/2);
      
      title3 = "Player 2 Lost, Better Luck Next Time!";
      let titleW3 = textWidth(title3);
      text("Player 2 Lost, Better Luck Next Time!", windowWidth/2 - titleW3/2, windowHeight/2 + 50);      
      
    } else if (player2.score == 2 && player1.score < 2) {
      title4 = "Player 2 Won!";
      let titleW4 = textWidth(title4);
      text("Player 2 Won!", windowWidth/2 - titleW4/2, windowHeight/2);
      
      title5 = "Player 1 Lost, Better Luck Next Time!";
      let titleW5 = textWidth(title5);
      text("Player 1 Lost, Better Luck Next Time!", windowWidth/2 - titleW5/2, windowHeight/2 + 50); 
    }
  
    //Choice Keys
    title6 = "Press Enter to Play Again";
    let titleW6 = textWidth(title6);
    text("Press Enter to Play Again", windowWidth/2 - titleW6/2, windowHeight-80);
  
    gametune.stop();
    if (!regularendtune.isLooping()) {regularendtune.setVolume(0.125); regularendtune.loop();}
}


function resetGame() {
    resetBall();
    player1.score = 0;
    player2.score = 0;
    pregame = endgame = false;
    startgame = true;
    startGame();
}

function checkWin() {
  //TODO 4: if the ball goes 'past' the paddle, the appropriate player's score should increment
  //the ball should also be reset
  if (ball.x <= borderSize) {
    player2.score += 1;
    resetBall();
  } else if (ball.x >= width - borderSize) {
    player1.score += 1;
    resetBall();
  }

  if (player1.score >= 2 || player2.score >= 2) {
     gameIsOver = true;
    endgame = true;
     endGame();
  }
}

function resetBall() {
  ballIsReset = true;
  ball.x = width / 2;
  ball.y = height / 2;
  var i = 0;
  while (i < 30000000) {
    // this is hacky but it's so there is a pause before the next round
    i += 1;
    noLoop();
  }
  player1.size = player2.size = avatarSize;
  if (powerup.type == "bolt") {ball.accel = 1.75;}
  if (powerup.type == "elect") {electtimer = 0; pupcdown = true; pupcdowntimer = 0;}
  if (powerup.type == "o2") {o2timer = 0; pupcdown = true; pupcdowntimer = 0; o2recty = 0;}
  if (powerup.type == "trash") {trashtimer = 0; powerup.x = windowWidth/2 - avatarSize/2; powerup.y = windowHeight/2 - avatarSize/2; pupcdown = true; pupcdowntimer = 0; collTimer = 0;}
  if (!pupcdown) {
    if (pupchoice == 4) {pupchoice = 0;} 
    else {pupchoice++;}
  }
  
  loop();
}


// making classes from scratch!
class Ball {
  constructor(x, y, hue, saturation, brightness, radius) {
    this.x = x;
    this.y = y;
    this.color = hue;
    this.r = radius;
    this.speed = random(ballMinSpeed, ballMaxSpeed);
    this.stepX = this.speed;
    this.stepY = this.speed;
    this.accel = 1.75;
    this.saturation = saturation;
    this.brightness = brightness;
  }

  showSelf() {
    if (powerup == "bolt" && hit4){strokeWeight(2); stroke(60, 100, 100);} else {noStroke();}
    fill(this.color, this.saturation, this.brightness);
    ellipse(this.x, this.y, this.r);
    noStroke();
    
  }

  moveSelf() {
    if (trashtimer > 1) {this.x = powerup.x + this.r; this.y = powerup.y;}
    else {
      if (this.y - this.r < 0) {
        this.stepY *= -1;
      }
      if (this.y + this.r > height) {
        this.stepY *= -1;
      }
      this.x += this.stepX*this.accel;
      this.y += this.stepY*this.accel;
    }
    
    
  }
}

class Paddle {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.score = 0;
    if (this.side == "L") {
      this.avatar = p1img;
    } else {
      this.avatar = p2img;
    }
    this.avatarMask;
    this.size = avatarSize;
  }

  showSelf() {
    fill('black'); // there's an invisible circle behind each character!
    // (x,y) in the paddle game code meant the top left corner of the rectangular paddle
    // to instead use avatars and ellipses, we need to make (x,y) mean the center of the circle
    
    // rect(this.x, this.y, avatarSize, avatarSize, 5);
   // ellipse(this.x+avatarSize/2, this.y+avatarSize/2, avatarSize)

    image(this.avatar, this.x, this.y, this.size, this.size);

  }

  moveSelf() {
    let upKey, downKey, leftKey, rightKey;
    let crossedLeftBorder, crossedRightBorder
    
    if (this.side == "L") {
      upKey = 87; // W
      downKey = 83; // S
      leftKey = 65;  // A
      rightKey = 68; // D
      crossedLeftBorder = this.x < 0;
      crossedRightBorder = this.x > width/2-player1.size;
    } else {
      upKey = UP_ARROW;
      downKey = DOWN_ARROW;
      leftKey = LEFT_ARROW;
      rightKey = RIGHT_ARROW;
      crossedLeftBorder = this.x < width/2;
      crossedRightBorder = this.x > width-player2.size;
    }
    
    if (keyIsDown(upKey) && this.y >= 0) {
      if ((powerup.type != "o2") || this.y > o2recty) {this.y -= 10;} else if (powerup.type =="o2" && this.y <= o2recty) {this.y == o2recty;}
    } else if (keyIsDown(downKey) && this.y <= height - avatarSize) {
      this.y += 10;
    } else if (keyIsDown(leftKey) && !crossedLeftBorder) {
      this.x -= 10;
    } else if (keyIsDown(rightKey) && !crossedRightBorder) {
      this.x += 10;
    }
  }
}

class Powerups{
  constructor(x, y) {
    let w1= random(1,2);
    let w2= random(1,2);
    this.x = x;//1(w1)
    this.y = y;//1(w2)
    let x1 = [windowWidth/2,windowWidth/2];//604, 1540
    let y1 = [windowHeight/2, windowHeight/2];
    let powerup = ["bolt", "elect", "o2", "shroom", "trash"];
    let choice = round(random(0,4));
    //let choice = "trash";
    this.type = powerup[choice];
  }
  
  activateSelf() {
    //console.log("hi");
    
    switch(this.type){
      case "bolt":
        //do bolt stuff
        if(hit4 && !ballIsReset){
          ball.accel *= 1.5;
          pupcdown = true;
          pupcdowntimer = 0;
        }
        break; 
      
      case "elect":
        
        background(0);
        
        if (pupcdown) {pupcdowntimer++;}
        if (pupcdowntimer >= 100) {pupcdown = false; pupcdowntimer = 0;}

        //console.log(pupcdown, ", ", pupcdowntimer);
        //console.log(ball.speed);

        stroke('white');
        bar = line(width/2, 0, width/2, height);
        noStroke();

        fill(0, 0, 100);
        ellipse(player1.x+player1.size/2, player1.y+player1.size/2, player1.size)
        ellipse(player2.x+player2.size/2, player2.y+player2.size/2, player2.size)
        ball.saturation = 0;
        ball.brightness = 2;
        ball.showSelf();

        player1.showSelf();
        player1.moveSelf();
        player2.showSelf();
        player2.moveSelf();

        ball.moveSelf();
  
        break;
        
      case "o2":
        //do o2 stuff
        colorMode(RGB, 255, 255, 255);
        fill(255, 0, 0, 50);
        rect(o2rectx, o2recty, windowWidth/2, o2recth);
        colorMode(HSB, 360, 100, 100);
        console.log(o2rectx, o2recty, o2recth);
        
        break;
        
      case "shroom":
        //do shroom stuff (lol)
        if (!ballIsReset) {
          if (p1hit) {player1.size*=1.5;} else if (p2hit) {player2.size*=1.5;}
          pupcdown = true;
          pupcdowntimer = 0;
        }  
        break;

      case "trash":
        
        if (p1hit) {
          this.x += (windowWidth/windowHeight)*5.0;
          this.y += (windowHeight/windowWidth)*5.0;
        } else if (p2hit) {
          this.x -= (windowWidth/windowHeight)*5.0;
          this.y -= (windowHeight/windowWidth)*5.0;
        }
        
        
        break;
        
    }
  }

  showSelf() {
    
    //console.log(this.type);
    //this.type = "bolt";
    
    //Ball-powerup collision
    hit4 = collideRectCircle(this.x, this.y, avatarSize, avatarSize, ball.x, ball.y, ball.r);
    
    //Player-powerup collision
    //hit4 = collideRectRect(player1.x, player1.y, avatarSize, avatarSize, this.x, this.y, avatarSize);
   // hit5 = collideRectRect(player2.x, player2.y, avatarSize, avatarSize, this.x, this.y, avatarSize);
    
    /*if (this.type == "bolt") {
      console.log("hi");
        //do bolt stuff
        image(boltimg, this.x, this.y, avatarSize, avatarSize)
        if(hit4){
          this.activateSelf();
        }
    }
    
    else if (this.type == "elect") {
      image(electimg, this.x, this.y, avatarSize, avatarSize);
    }
    
    else if (this.type == "o2") {
      image(o2img, this.x, this.y, avatarSize, avatarSize)
      
    }
    
    else if (this.type == "shroom") {
      image(shroomimg, this.x, this.y, avatarSize, avatarSize);
        if(hit4){
          this.activateSelf();
        }
    }
    
    else if (this.type == "trash") {
      image(trashimg, this.x, this.y, avatarSize, avatarSize);
    }*/
        
    switch(this.type) {
        
      case "bolt":
        //do bolt stuff
        image(boltimg, this.x, this.y, avatarSize, avatarSize)
        if(hit4){
          this.activateSelf();
        }
        
        break; 
      
      case "elect":
        
        //do elect stuff
        image(electimg, this.x, this.y, avatarSize, avatarSize);
        /*if(hit4 && !pupcdown){
          this.activateSelf();
        }*/
        
        break;
        
      case "o2":
        
        //do o2 stuff
        image(o2img, this.x, this.y, avatarSize, avatarSize)
        
        break;
        
      case "shroom":
        
        //do shroom stuff (lol)
        image(shroomimg, this.x, this.y, avatarSize, avatarSize);
        if(hit4){
          this.activateSelf();
        }
        
        break;

      case "trash":
        
        //do trash stuff
        image(trashimg, this.x, this.y, avatarSize, avatarSize);
        /*if(hit4){
          this.activateSelf();
        }*/
        
        break;
        
    }
  
  }
  
}

