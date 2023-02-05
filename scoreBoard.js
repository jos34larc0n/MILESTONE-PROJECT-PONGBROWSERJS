const scoreboard = document.getElementById("scoreboard");
const restartBtn = document.getElementById("restart-btn");
let player1Score = 0;
let player2Score = 0;


// Function to handle the end of the game and update the scoreboard display
function updateScoreboard() {
    if(player1Score < 10 && player2Score < 10)
    scoreboard.innerHTML = `Player 1: ${player1Score} | Player 2: ${player2Score}`
    else if(player1Score === 10 || player2Score === 10) {
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
  updateScoreboard();
});





