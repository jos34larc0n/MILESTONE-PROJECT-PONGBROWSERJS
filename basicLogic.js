// Get the table deck, player1 and player2 elements from the HTML document
const tableDeck = document.getElementById("deck");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ball = document.getElementById("ball");
// Set the initial position of player1 and player2 to the center of the table deck
player1.style.top = `${tableDeck.offsetHeight / 2 - player1.offsetHeight / 2}px`;
player2.style.top = `${tableDeck.offsetHeight / 2 - player2.offsetHeight / 2}px`;
// Set the initial position of the ball to the center of the table deck
ball.style.left = `${tableDeck.offsetWidth / 2 - ball.offsetWidth / 2}px`;
ball.style.top = `${tableDeck.offsetHeight / 2 - ball.offsetHeight / 2}px`;
// Set the initial speed of the ball
let ballSpeed = {
  x: 5,
  y: 5
};
// Add event listeners for the keydown events of player1 and player2
// Player1 will move up and down with the arrow keys
document.addEventListener("keydown", event => {
  switch (event.code) {
  case "ArrowUp":
  player1.style.top = $;{Math.max(0, player1.offsetTop - 5)}px;
  break;
  case "ArrowDown":
  player1.style.top = $;{Math.min(tableDeck.offsetHeight - player1.offsetHeight, player1.offsetTop + 5)}px;
  break;
  }
  });
  // Player2 will move up and down with the 'W' and 'S' keys
  document.addEventListener("keyup", event => {
  switch (event.code) {
  case "KeyW":
  player2.style.top = $;{Math.max(0, player2.offsetTop - 5)}px;
  break;
  case "KeyS":
  player2.style.top = $;{Math.min(tableDeck.offsetHeight - player2.offsetHeight, player2.offsetTop + 5)}px;
  break;
  }
  });
  
// Game loop function that updates the position of the ball and checks for collisions with the players and table deck
async function gameLoop() {
  // Update the position of the ball
  ball.style.left = `${ball.offsetLeft + ballSpeed.x}px`;
  ball.style.top = `${ball.offsetTop + ballSpeed.y}px`;
// Check if the ball hits the top or bottom of the table deck and reverse the y-direction of the ball speed
  if (ball.offsetTop <= 0 || ball.offsetTop + ball.offsetHeight >= tableDeck.offsetHeight) {
    ballSpeed.y = -ballSpeed.y;
  }
// Check if the ball hits player1 and reverse the x-direction of the ball speed
  if (ball.offsetLeft <= player1.offsetLeft + player1.offsetWidth && ball.offsetTop + ball.offsetHeight >= player1.offsetTop && ball.offsetTop <= player1.offsetTop + player1.offsetHeight) {
    ballSpeed.x = -ballSpeed.x;
  }
  // Check if the ball hits player1 and reverse the x-direction of the ball speed
  if (ball.offsetLeft + ball.offsetWidth >= player2.offsetLeft && ball.offsetTop + ball.offsetHeight >= player2.offsetTop && ball.offsetTop <= player2.offsetTop + player2.offsetHeight) {
    ballSpeed.x = -ballSpeed.x;
  }
// Check if the ball goes past player1 or player2 and end the game
  if (ball.offsetLeft + ball.offsetWidth < 0) {
    alert("Player 2 wins!");
    clearInterval(intervalId);
  }
  if (ball.offsetLeft > tableDeck.offsetWidth) {
    alert("Player 1 wins!");
    clearInterval(intervalId);
  }
/*By wrapping this method in a Promise and awaiting it, the JavaScript execution is blocked until the next render cycle has completed. 
This is often used to ensure that a change to the DOM (such as a layout or style change) has completed before further JavaScript logic is executed.*/
  await new Promise(resolve => requestAnimationFrame(resolve));
}
// Start the game loop
const intervalId = setInterval(gameLoop, 50);