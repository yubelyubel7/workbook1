let headsImg, tailsImg;
let coins = [];
const NUM_COINS = 18;
const COIN_SIZE = 100;

function preload() {
  headsImg = loadImage('data/heads.png'); 
  tailsImg = loadImage('data/tails.png');  
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  
  for (let i = 0; i < NUM_COINS; i++) {
    coins.push({
      x: random(width),         
      y: random(height),  
      isHeads: random() > 0.5,   
      rotation: random(TWO_PI),  // Random rotation (0 to 2π radians)
      size: random(COIN_SIZE * 0.7, COIN_SIZE * 1.3),  // Varied sizes for visual interest
      speed: random(0.5, 2)      // Random movement speed for each coin
    });
  }
}

function draw() {
  background(40, 40, 60);
  
  // Process and draw each coin in the array
  for (let coin of coins) {
    // Save the current drawing state before transformations
    push();
    // Move origin to coin's position
    translate(coin.x, coin.y);
    // Apply rotation to the coin
    rotate(coin.rotation);
    
    // Draw either heads or tails image based on coin's state
    if (coin.isHeads) {
      // Draw heads image centered at the origin
      image(headsImg, -coin.size/2, -coin.size/2, coin.size, coin.size);
    } else {
      // Draw tails image centered at the origin
      image(tailsImg, -coin.size/2, -coin.size/2, coin.size, coin.size);
    }
    // Restore the drawing state to what it was before the transformations
    pop();
    
    // Add random movement to each coin for a drifting jittering effect
    coin.x += random(-1, 1) * coin.speed;  // Random horizontal movement
    coin.y += random(-1, 1) * coin.speed;  // Random vertical movement
    coin.rotation += 0.01 * coin.speed;    // Slight rotation over time
    
    // Screen wrapping: if a coin goes off screen, it appears on the opposite side
    if (coin.x > width + coin.size/2) coin.x = -coin.size/2;
    if (coin.x < -coin.size/2) coin.x = width + coin.size/2;
    if (coin.y > height + coin.size/2) coin.y = -coin.size/2;
    if (coin.y < -coin.size/2) coin.y = height + coin.size/2;
  }
}

/**
 * mousePressed() is triggered when any mouse button is clicked
 * Used to add new coins to the canvas when user clicks
 */
function mousePressed() {
  // Check if click is on the window element, and if so, don't add a coin
  const windowElement = document.querySelector('.window');
  if (windowElement) {
    // Get the bounding rectangle of the window element
    const rect = windowElement.getBoundingClientRect();
    // If mouse is within the window bounds, exit function
    if (mouseX >= rect.left && mouseX <= rect.right &&
        mouseY >= rect.top && mouseY <= rect.bottom) {
      return;
    }
  }
  
  // Create a new coin object at the mouse position
  const newCoin = {
    x: mouseX,                   // Position at mouse X
    y: mouseY,                   // Position at mouse Y
    isHeads: random() > 0.5,     // ~50% chance to be heads or tails
    rotation: random(TWO_PI),    // Random rotation
    size: random(COIN_SIZE * 0.7, COIN_SIZE * 1.3),  // Random size
    speed: random(0.5, 2)        // Random speed
  };
  
  // Add the new coin to the coins array
  coins.push(newCoin);
  
  // Randomly flip some existing coins (20% chance for each coin)
  for (let coin of coins) {
    if (random() < 0.2) {  // 20% probability
      coin.isHeads = !coin.isHeads;  // Flip from heads to tails or vice versa
    }
  }
}

// Used ChatGPT and GitHub Copilot to help with the code and explain how it works