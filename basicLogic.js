// Get the table deck, player1 and player2 elements from the HTML document
const tableDeck = document.getElementById("deck");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ball = document.getElementById("ball");
//Declare current player global variable to create a function that handles each turn
let currentPlayer = 1;
let player1Moving = false;
let player2Moving = false;
// Set the initial position of player1 and player2 to the center of the table deck
player1.style.top = `${tableDeck.offsetHeight / 2 - player1.offsetHeight / 2}px`;
player2.style.top = `${tableDeck.offsetHeight / 2 - player2.offsetHeight / 2}px`;
// Set the initial position of the ball to the center of the table deck
ball.style.left = `${tableDeck.offsetWidth / 2 - ball.offsetWidth / 2}px`;
ball.style.top = `${tableDeck.offsetHeight / 2 - ball.offsetHeight / 2}px`;
// Set the initial speed of the ball
let ballSpeed = {
  x: 1,
  y: 1
};

// Add event listeners for the keydown and keyup events of player1 and player2
let player1Interval;
let player2Interval;
//refactor key event listeners to allow both plays to move simoultaneously while holding the pressed key
document.addEventListener("keydown", (key) => {
if (key.code === "ArrowUp" || key.code === "ArrowDown") {
if (!player1Moving) {
handleKeyPressPlayer1(key, player1, tableDeck, true);
player1Moving = true;
}
} else if (key.code === "KeyW" || key.code === "KeyS") {
if (!player2Moving) {
handleKeyPressPlayer2(key, player2, tableDeck, true);
player2Moving = true;
}
}
});
//add a key up listener to switch player dynamic
document.addEventListener("keyup", (key) => {
if (key.code === "ArrowUp" || key.code === "ArrowDown") {
handleKeyPressPlayer1(key, player1, tableDeck, false);
player1Moving = false;
} else if (key.code === "KeyW" || key.code === "KeyS") {
handleKeyPressPlayer2(key, player2, tableDeck, false);
player2Moving = false;
}
});

// Function to handle key press events for player1
function handleKeyPressPlayer1(key, player, tableDeck, moving) {
switch (key.code) {
case "ArrowUp":
if (moving) {
player1Interval = setInterval(() => {
player.style.top = Math.max(0, player.offsetTop - 25) + "px";
}, 100);
} else {
clearInterval(player1Interval);
}
break;
case "ArrowDown":
if (moving) {
player1Interval = setInterval(() => {
player.style.top = Math.min(tableDeck.offsetHeight - player.offsetHeight, player.offsetTop + 25) + "px";
}, 100);
} else {
clearInterval(player1Interval);
}
break;
}
}

// Function to handle key press events for player2
function handleKeyPressPlayer2(key, player, tableDeck, moving) {
switch (key.code) {
case "KeyW":
if (moving) {
player2Interval = setInterval(() => {
player.style.top = Math.max(0, player.offsetTop - 25) + "px";
}, 100);
} else {
clearInterval(player2Interval);
}
break;
  case "KeyS":
    if (moving) {
    player2Interval = setInterval(() => {
    player.style.top = Math.min(tableDeck.offsetHeight - player.offsetHeight, player.offsetTop + 25) + "px";
    }, 100);
    } else {
    clearInterval(player2Interval);
    }
    break;
    }
    }
// Game loop function that updates the position of the ball and checks for collisions with the players and table deck
async function gameLoop() {
  //add functionality to handle each player turns 
  async function handlePlayerTurn() {
    updateScoreboard();
    // Check if the ball has touched the other player
    if (currentPlayer === 1 && ball.offsetLeft <= player1.offsetLeft + player1.offsetWidth) {
      currentPlayer = 1;  
    } else if (currentPlayer === 2 && ball.offsetLeft + ball.offsetWidth >= player2.offsetLeft) {
      currentPlayer = 2;
      
    }
  }
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
// Check if the ball goes past player1 or player2 and end the game and reset ball original position
  if (ball.offsetLeft + ball.offsetWidth < 0) {
    player1Score++;
    updateScoreboard();
ball.style.left = `${tableDeck.offsetWidth / 2 - ball.offsetWidth / 2}px`;
ball.style.top = `${tableDeck.offsetHeight / 2 - ball.offsetHeight / 2}px`;
currentPlayer = 1;
  }
  if (ball.offsetLeft > tableDeck.offsetWidth) {
    player2Score++;
    updateScoreboard();
// Reset the position 
   ball.style.left = `${tableDeck.offsetWidth / 2 - ball.offsetWidth / 2}px`;
   ball.style.top = `${tableDeck.offsetHeight / 2 - ball.offsetHeight / 2}px`;
   currentPlayer = 2;
  }
/*By wrapping this method in a Promise and awaiting it, the JavaScript execution is blocked until the next render cycle has completed. 
This is often used to ensure that a change to the DOM (such as a layout or style change) has completed before further JavaScript logic is executed.*/
while (currentPlayer === 1 && ball.offsetLeft > player1.offsetLeft + player1.offsetWidth || currentPlayer === 2 && ball.offsetLeft + ball.offsetWidth < player2.offsetLeft) {
  await new Promise(resolve => setTimeout(resolve, 15));
}

}
// Start the game loop
const intervalId = setInterval(gameLoop)
//references to documentation used to write this code: 
