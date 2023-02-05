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
  const powerboostBall = document.createElement("div");
  powerboostBall.classList.add("powerboost-ball");
  // Set the initial left and top position of the powerboost ball using random values within the table deck area.
  powerboostBall.style.left = `${Math.floor(Math.random() * tableDeck.offsetWidth)}px`;
  powerboostBall.style.top = `${Math.floor(Math.random() * tableDeck.offsetHeight)}px`;
  // Set the powerboost type of the powerboost ball using a random value from the `powerboostBallTypes` array.
  powerboostBall.powerboostType = powerboostBallTypes[Math.floor(Math.random() * powerboostBallTypes.length)];
  tableDeck.appendChild(powerboostBall);
  powerboostBalls.push(powerboostBall);
};

// `handlePowerboostBallEffects` function is used to handle the effects of a powerboost ball on the player or ball.
const handlePowerboostBallEffects = (player, powerboostBall) => {
  // Use a switch statement to handle the different types of powerboost balls.
  switch (powerboostBall.powerboostType) {
    case "shrink":
        powerboostBall.style.backgroundColor = "rgb(255, 0, 0)";
        powerboostBall.innerHTML = type.charAt(0); 
     player.style.height = `${player.offsetHeight / 2}px`;
      setTimeout(() => {
        player.style.height = `${player.offsetHeight * 2}px`;
      }, 5000);
      break;
    case "mirror":
        powerboostBall.style.backgroundColor = "rgb(0, 255, 0)";
        powerboostBall.innerHTML = type.charAt(0);
        player.style.transform = "scaleX(-1)";
        setTimeout(() => {
        player.style.transform = "scaleX(1)";
      }, 5000);
      break;
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
      handlePowerboostBallEffects(ball.lastTouchedBy, powerboostBall);
      powerboostBall.remove();
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
        powerboostBalls.forEach((powerboostBall) => {
        // Generate random values for the x and y direction of the powerboost ball's movement.
        const xDirection = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
        const yDirection = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
        // Calculate the new left and top position of the powerboost ball by adding the current position and the x and y direction values.
        let newLeft = powerboostBall.offsetLeft + (xDirection * Math.floor(Math.random() * 10));
        let newTop = powerboostBall.offsetTop + (yDirection * Math.floor(Math.random() * 10));
        // Check if the new left position is less than 0 or greater than the table deck's width, if so, reverse the x direction.
        if (newLeft < 0 || newLeft + powerboostBall.offsetWidth > tableDeck.offsetWidth) {
        xDirection = -xDirection;
        newLeft = powerboostBall.offsetLeft + (xDirection * Math.floor(Math.random() * 10));
        }
        // Check if the new top position is less than 0 or greater than the table deck's height, if so, reverse the y direction.
        if (newTop < 0 || newTop + powerboostBall.offsetHeight > tableDeck.offsetHeight) {
        yDirection = -yDirection;
        newTop = powerboostBall.offsetTop + (yDirection * Math.floor(Math.random() * 10));
        }
        powerboostBall.style.left = `${newLeft}px`;
        powerboostBall.style.top = `${newTop}px`;
        });
        };
generatePowerboostBall();

setInterval(() => {
movePowerboostBalls();
}, 500);
            