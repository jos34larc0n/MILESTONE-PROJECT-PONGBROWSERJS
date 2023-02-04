const scoreboard = document.getElementById("scoreboard");
const restartBtn = document.getElementById("restart-btn");
let player1Score = 0;
let player2Score = 0;


// Function to update the scoreboard display
function updateScoreboard() {
  scoreboard.innerHTML = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
}

// Function to handle the end of the game
function endGame() {
  // Add a condition to check if either player has scored 10 points and display the game over UI
  if (player1Score === 10 || player2Score === 10) {
    // Hide the table deck
    tableDeck.style.display = "none";
    // Show the game over UI
    document.getElementById("game-over").style.display = "flex";
    // Display the winner in the game over UI
    document.getElementById("winner").innerHTML = `Winner Player ${player1Score === 10 ? 1 : 2}`;
    // Stop the game loop
    return;
  }
}

// Add event listener to restart the game when the restart button is clicked
restartBtn.addEventListener("click", () => {
  player1Score = 0;
  player2Score = 0;
  updateScoreboard();
});
const intervalId = setInterval(gameLoop, endGame);
  




// Start game loop
const startGameLoop = () => {
    setInterval(() => {
    updatePowerboostBalls();
    checkForPowerboostBallInteraction();
    }, 50);
    };
    
    // Start game
    initPowerboostBalls();