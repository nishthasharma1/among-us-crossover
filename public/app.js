// List socket.io functions below so glitch will recognize them
/* global io */
// List p5 functions below so glitch will recognize them
/* global createCanvas, background, colorMode, HSB, random, noStroke, fill, ellipse, mouseX, mouseY */
const socket = io();

let idx, state;

// Listen for a setPlayer message from the server,
// this gives us our player index
socket.on("setPlayer", data => {
  console.log("I am player " + data.idx);  
  idx = data.idx;
})

// Listen for a setState message from the server,
// this gives us the update game state (see server.js
// for the struct of this object).
socket.on("setState", data => {
  state = data;
})

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  // There is no draw, all canvas updates are in response to
  // server message or mouse movements
  background(95);
  fill(0);
  textSize(16);
  text(`I am player ${idx}`, 10, 16);
  
  // If we have been give a 'state' object by the
  // server, then use it to draw the paddles and ball
  if (state) {
    noStroke();
    fill(0, 100, 100);
    rect(state.players[0].x - 20, state.players[0].y - 5, 40, 10)
    fill(180, 100, 100);
    rect(state.players[1].x - 20, state.players[1].y - 5, 40, 10)
    fill(270, 100, 100);
    ellipse(state.ball.x, state.ball.y, 10, 10);    
  }
}

function keyPressed() {
  // Send a playerMove to the server if either the
  // left or right arrow keys have been pressed.
  if (keyCode == LEFT_ARROW) {
    socket.emit("playerMove", { idx: idx, x: state.players[idx].x - 10 });
  }
  if (keyCode == RIGHT_ARROW) {
    socket.emit("playerMove", { idx: idx, x: state.players[idx].x + 10 });
  }
}
