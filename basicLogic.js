// Get the table deck, player1 and player2 elements from the HTML document
const tableDeck = document.getElementById("deck");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ball = document.getElementById("ball");
//Declare current player global variable to create a function that handles each turn
let currentPlayer = 1;
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
document.addEventListener("keydown", (key) => {
  // Call handleKeyPressPlayer1 function for player1 when the keydown event is triggered
  handleKeyPressPlayer1(key, player1, tableDeck);
  // Call handleKeyPressPlayer2 function for player2 when the keydown event is triggered
  handleKeyPressPlayer2(key, player2, tableDeck);
});

// Function to handle key press events for player1
function handleKeyPressPlayer1(key, player, tableDeck) {
  // Check the code of the key that was pressed
  switch (key.code) {
    case "ArrowUp":
      // If the up arrow key is pressed, move player1 up by 5 pixels
      // The position of the player1 is calculated by taking the maximum between 0 and the current top position minus 5 pixels
      player.style.top = Math.max(0, player.offsetTop - 25) + "px";
      break;
    case "ArrowDown":
      // If the down arrow key is pressed, move player1 down by 5 pixels
      // The position of the player1 is calculated by taking the minimum between the table deck height minus player height and the current top position plus 5 pixels
      player.style.top = Math.min(tableDeck.offsetHeight - player.offsetHeight, player.offsetTop + 25) + "px";
      break;
  }
}

// Function to handle key press events for player2
function handleKeyPressPlayer2(key, player, tableDeck) {
  // Check the code of the key that was pressed
  switch (key.code) {
    case "KeyW":
      // If the 'W' key is pressed, move player2 up by 5 pixels
      // The position of the player2 is calculated by taking the maximum between 0 and the current top position minus 5 pixels
      player.style.top = Math.max(0, player.offsetTop - 25) + "px";
      break;
    case "KeyS":
      // If the 'S' key is pressed, move player2 down by 5 pixels
      // The position of the player2 is calculated by taking the minimum between the table deck height minus player height and the current top position plus 5 pixels
      player.style.top = Math.min(tableDeck.offsetHeight - player.offsetHeight, player.offsetTop + 25) + "px";
      break;
  }
}
// Game loop function that updates the position of the ball and checks for collisions with the players and table deck
async function gameLoop() {
  //add functionality to handle each player turns 
  async function handlePlayerTurn() {
    // Check if the ball has touched the other player
    if (currentPlayer === 1 && ball.offsetLeft <= player1.offsetLeft + player1.offsetWidth) {
      // Set current player to player 2
      currentPlayer = 1;
      player2Score++;
      if (player2Score >= 10) {
      alert("Player 2 wins!");
      return};
      
    } else if (currentPlayer === 2 && ball.offsetLeft + ball.offsetWidth >= player2.offsetLeft) {
      // Set current player to player 1
      currentPlayer = 2;
      player1Score++;
      if (player2Score >= 10) {
        alert("Player 2 wins!");
        return};
    }
  
    // Wait for the current player to touch the ball
    while (currentPlayer === 1 && ball.offsetLeft > player1.offsetLeft + player1.offsetWidth || currentPlayer === 2 && ball.offsetLeft + ball.offsetWidth < player2.offsetLeft) {
      await new Promise(resolve => setTimeout(resolve, 15));
    }
  }
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
    handlePlayerTurn(1);
  }
  // Check if the ball hits player1 and reverse the x-direction of the ball speed
  if (ball.offsetLeft + ball.offsetWidth >= player2.offsetLeft && ball.offsetTop + ball.offsetHeight >= player2.offsetTop && ball.offsetTop <= player2.offsetTop + player2.offsetHeight) {
    ballSpeed.x = -ballSpeed.x;
    handlePlayerTurn(2);
  }
// Check if the ball goes past player1 or player2 and end the game
  if (ball.offsetLeft + ball.offsetWidth < 0) {
    clearInterval(intervalId);
  }
  if (ball.offsetLeft > tableDeck.offsetWidth) {
    clearInterval(intervalId);
  }
/*By wrapping this method in a Promise and awaiting it, the JavaScript execution is blocked until the next render cycle has completed. 
This is often used to ensure that a change to the DOM (such as a layout or style change) has completed before further JavaScript logic is executed.*/
  await new Promise(resolve => requestAnimationFrame(resolve));

}
// Start the game loop


