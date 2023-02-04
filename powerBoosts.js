// store all the powerboost balls created in the game.
const powerboostBalls = [];

//store the different types of powerboost balls that can be created.
const powerboostBallTypes = [
"shrink",
"mirror",
"Speed up"
];

// Create a powerboost ball.
const createPowerboostBall = () => {
  // Create a div element to represent the powerboost ball.
  const powerboostBall = document.createElement("div");
  // Add a class to the div element for styling purposes.
  powerboostBall.classList.add("powerboost-ball");
  // Set the initial left and top position of the powerboost ball using random values within the table deck area.
  powerboostBall.style.left = `${Math.floor(Math.random() * tableDeck.offsetWidth)}px`;
  powerboostBall.style.top = `${Math.floor(Math.random() * tableDeck.offsetHeight)}px`;
  // Set the powerboost type of the powerboost ball using a random value from the `powerboostBallTypes` array.
  powerboostBall.powerboostType = powerboostBallTypes[Math.floor(Math.random() * powerboostBallTypes.length)];
  // Code to assign different colors and content to each powerboostball type
  // Add the powerboost ball to the table deck.
  tableDeck.appendChild(powerboostBall);
  // Push the powerboost ball to the `powerboostBalls` array.
  powerboostBalls.push(powerboostBall);
};

// `handlePowerboostBallEffects` function is used to handle the effects of a powerboost ball on the player or ball.
const handlePowerboostBallEffects = (player, powerboostBall) => {
  // Use a switch statement to handle the different types of powerboost balls.
  switch (powerboostBall.powerboostType) {
    // For the "shrink" type, reduce the height of the player by half, then restore it to its original height after 5 seconds.
    case "shrink":
        powerboostBall.style.backgroundColor = "rgb(255, 0, 0)";
        powerboostBall.innerHTML = type.charAt(0); 
     player.style.height = `${player.offsetHeight / 2}px`;
      setTimeout(() => {
        player.style.height = `${player.offsetHeight * 2}px`;
      }, 5000);
      break;
    // For the "mirror" type, flip the player horizontally, then restore it to its original state after 5 seconds.
    case "mirror":
        powerboostBall.style.backgroundColor = "rgb(0, 255, 0)";
        powerboostBall.innerHTML = type.charAt(0);
        player.style.transform = "scaleX(-1)";
        setTimeout(() => {
        player.style.transform = "scaleX(1)";
      }, 5000);
      break;
    // For the "shrinkBall" type, reduce the size of the ball by half, then restore it to its original size after 5 seconds.
    case "Speed up":
        powerboostBall.style.backgroundColor = "rgb(0, 0, 255)";
        powerboostBall.innerHTML = type.charAt(0);
      setTimeout(() => {
      ballSpeed+=5;
      }, 5000);
      ballSpeed-=5;
      break;
  }}
    // Loop through all the powerboost balls in the powerboostBalls array and check for any collision with the player.
const checkPowerboostBallCollision = (ball) => {
    powerboostBalls.forEach((powerboostBall) => {
    const ballRect = ball.getBoundingClientRect();
    const powerboostBallRect = powerboostBall.getBoundingClientRect();
    
    if (ballRect.left < powerboostBallRect.right &&
        ballRect.right > powerboostBallRect.left &&
        ballRect.top < powerboostBallRect.bottom &&
        ballRect.bottom > powerboostBallRect.top) {
      // Call the `handlePowerboostBallEffects` function and pass in the player who touched the ball before it touches the powerboost ball.
      handlePowerboostBallEffects(ball.lastTouchedBy, powerboostBall);
      // Remove the powerboost ball from the table deck.
      powerboostBall.remove();
      // Remove the powerboost ball from the `powerboostBalls` array.
      powerboostBalls.splice(powerboostBalls.indexOf(powerboostBall), 1);
    }
    
    });
    
    };
// Function to generate a random powerboost ball every 5 seconds and render on screen
const generatePowerboostBall = () => {
    setInterval(() => {
    createPowerboostBall();
    }, 5000);
    };
    
    // Function to move the powerboost balls randomly around the table deck
    const movePowerboostBalls = () => {
    setInterval(() => {
    powerboostBalls.forEach((powerboostBall) => {
    // Generate random values for the left and top positions of the powerboost ball.
    const randomLeft = Math.floor(Math.random() * tableDeck.offsetWidth);
    const randomTop = Math.floor(Math.random() * tableDeck.offsetHeight);
    // Update the position of the powerboost ball using the generated random values.
    powerboostBall.style.left = `${randomLeft}px`;
    powerboostBall.style.top = `${randomTop}px`;
    });
    }, 1000);
    };
    
    // Call the generatePowerboostBall function to start generating powerboost balls every 5 seconds.
    generatePowerboostBall();
    
    // Call the movePowerboostBalls function to start moving the powerboost balls randomly around the table deck.
    movePowerboostBalls();