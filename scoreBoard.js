const scoreboard = document.getElementById("scoreboard");
const restartBtn = document.getElementById("restart-btn");
let player1Score = 0;
let player2Score = 0;
scoreboard.hidden = true;

// Function to handle the end of the game and update the scoreboard display
function updateScoreboard() {
  scoreboard.hidden = false;
    if(player1Score < 10 && player2Score < 10)
    scoreboard.innerHTML = `LOCAL: ${player1Score} | VISITOR: ${player2Score}`
    else if(player1Score === 10 || player2Score === 10) {
        scoreboard.hidden = true;
      tableDeck.style.display = "none";
        document.getElementById("game-over").style.display = "flex";
        document.getElementById("winner").innerHTML = `Winner Player ${player1Score === 10 ? 1 : 2}`;
        return;
      };
}


// Add event listener to restart the game when the restart button is clicked
restartBtn.addEventListener("click", () => {
  player1Score = 0;
  player2Score = 0;
  document.getElementById("game-over").style.display = "none";
  tableDeck.style.display = "block"
  updateScoreboard();
  clearInterval(intervalId)
  const intervalId = setInterval(gameLoop)
});





