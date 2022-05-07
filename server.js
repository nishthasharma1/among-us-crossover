// Similar to a <script>, require is used by node.js to load librarys
const express = require("express"); // express is a web framework to make servers easier to write
const socket = require("socket.io"); // socket.io is a library to make websockets easier to use

// Create an express application, and tell it to serve static content from the public folder.
// The public folder contains our client code, this is similar to what the default glitch behaviour is.
let app = express();
app.use(express.static("public"));
let server = app.listen(process.env.PORT);

// Create a websocket server (io), layered on top of the express server (server)
let io = socket(server);

let state = {
  // This had better match the canvas on the client side
  board: {
    width: 400,
    height: 400
  },
  players: [
    {
      name: "Player 1",
      x: 200,
      y: 50
    },
    {
      name: "Player 2",
      x: 200,
      y: 350
    }
  ],
  ball: resetBall()
};

let nextPlayer = 0;

// Return a ball position thats rougly
// in the middle and travelling towards
// one of the two players.
function resetBall() {
  let dx = 2*Math.random() - 1; // between -1 and 1
  let dy = 2*Math.round(Math.random()) - 1; // -1 or 1
  let norm = Math.sqrt(dx*dx + dy*dy)
  return {
    x: 175 + 50*Math.random(),
    y: 200,
    dx: 2*dx/norm,
    dy: 2*dy/norm,
  };  
}

// Advance the game state, move the ball, check
// that it hasn't left the edges. Then send the
// state to all connected clients.
function updateState() {
  state.ball.x += state.ball.dx;
  state.ball.y += state.ball.dy;
  if (state.ball.x < 0) {
    state.ball.x = 0;
    state.ball.dx *= -1;
  }
  if (state.ball.x > state.board.width) {
    state.ball.x = state.board.width;
    state.ball.dx *= -1;
  }
  if (state.ball.y < 0) {
    // red loses
    state.ball = resetBall();
  }
  if (state.ball.y > state.board.height) {
    // blue loses
    state.ball = resetBall();
  }
  io.of("/").emit("setState", state);
}

// Set an interval timer that calls updateState
// every 50 milliseconds (so 20 frames per second)
setInterval(updateState, 50);

// Handle a new connection (which happens in app.js)
io.on("connection", socket => {
  // Eeach socket is made either "Player 1" or
  // "Player 2", not ideal but simple to start.
  // This makes it easy to develop, as changes
  // to app.js/index.html will end up making
  // alot of new sockets.
  if (nextPlayer == 2) {
    nextPlayer = 0;
  }
  let idx = nextPlayer++;
  console.log("Assigned player " + idx)
  socket.emit("setPlayer", { idx: idx });

  // Register an event handler when a client
  // call playerMove to adjust the game state
  socket.on("playerMove", data => {
    // Only the first two players play
    if (data.idx < state.players.length) {
      // We only move the paddle left and right, ignore y
      state.players[data.idx].x = data.x;
    }
  });
});

console.log("Ready");