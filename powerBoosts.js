// store all the powerboost balls created in the game.
const powerboostBalls = [];

//store the different types of powerboost balls that can be created.
const powerboostBallTypes = [
"shrink",
"mirror",
"shrinkBall"
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
      player.style.height = `${player.offsetHeight / 2}px`;
      setTimeout(() => {
        player.style.height = `${player.offsetHeight * 2}px`;
      }, 5000);
      break;
    // For the "mirror" type, flip the player horizontally, then restore it to its original state after 5 seconds.
    case "mirror":
      player.style.transform = "scaleX(-1)";
      setTimeout(() => {
        player.style.transform = "scaleX(1)";
      }, 5000);
      break;
    // For the "shrinkBall" type, reduce the size of the ball by half, then restore it to its original size after 5 seconds.
    case "shrinkBall":
      ball.style.width = `${ball.offsetWidth / 2}px`;
      ball.style.height = `${ball.offsetHeight / 2}px`;
      setTimeout(() => {
        ball.style.width = `${ball.offsetWidth * 2}px`;
        ball.style.height = `${ball.offsetHeight * 2}px`;
      }, 5000);
      break;
  }}