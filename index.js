// Define constant variables for the game deck and the game Elements from the HTML document 
const tableDeck = document.getElementById("pong"); // A reference to the tableDeck element in the HTML document with an id of "pong".
const player1 = document.getElementById("player1"); // A reference to the first player element in the HTML document with an id of "player1".
const player2 = document.getElementById("player2"); // A reference to the second player element in the HTML document with an id of "player2".
const ball = document.getElementById("ball"); // A reference to the ball element in the HTML document with an id of "ball".

// Set initial position of the players and ball on the game deck
player1.y = tableDeck.height / 2 - player1.height / 2; // Place the first player vertically in the center of the canvas.
player2.y = tableDeck.height / 2 - player2.height / 2; // Place the second player vertically in the center of the canvas.
ball.x = tableDeck.width / 2 - ball.width / 2; // Place the ball horizontally in the center of the canvas.
ball.y = tableDeck.height / 2 - ball.height / 2; // Place the ball vertically in the center of the canvas.

// Set initial speed of the ball
let ballSpeed = {
x: 5, // Initial horizontal speed.
y: 5 // Initial vertical speed.
};


