// Multiple falling images with gravity
// The Coding Train / Daniel Shiffman
// taken from https://editor.p5js.org/codingtrain/sketches/JTIN5dIVB and edited with assistance from ChatGPT for explanations and issues

let fallingImages = []; // Array to hold all falling image objects
const totalImages = 69; // Total number of images to create
let framesUntilNext = 0; // Counter for releasing new images
let img; // Variable for the base image

// Preload the image
function preload() {
  img = loadImage('data/fallumbralis.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(LEFT, TOP);
  textSize(24);
}

function draw() {
  background(0);
  
  // Release a new image every few frames until we reach the limit
  if (fallingImages.length < totalImages && framesUntilNext <= 0) {
    // Create a new falling image
    let newImage = {
      x: random(width), // Random x position
      y: -100, // Start above the canvas
      velY: random(1, 5), // Random initial velocity
      accY: random(0.8, 1.2), // Slightly different gravity for each
      size: random(0.4, 0.7), // Random scaling factor (makes image smaller)
      rotation: random(TWO_PI) // Random initial rotation
    };
    
    fallingImages.push(newImage);
    framesUntilNext = int(random(5, 15)); // Wait between 5-15 frames before next image
  } else {
    framesUntilNext--;
  }
  
  // Update and display all falling images
  for (let i = 0; i < fallingImages.length; i++) {
    let f = fallingImages[i];
    
    // Apply physics
    f.velY = f.velY + f.accY;
    f.y = f.y + f.velY;
    
    // Get scaled dimensions for collision detection
    let imgHeight = img.height * f.size;
    let imgWidth = img.width * f.size;
    
    // Floor collision
    if (f.y > height - imgHeight/2) {
      f.velY = f.velY * -0.85; // Bounce with energy loss
      f.y = height - imgHeight/2; // Prevent falling through floor
    }
    
    // Draw the image
    push();
    translate(f.x, f.y);
    rotate(f.rotation + (frameCount * 0.01 * (i % 2 === 0 ? 1 : -1))); // Gentle rotation
    image(img, 0, 0, imgWidth, imgHeight);
    pop();
  }
  

  fill(255);
  stroke(0);
  strokeWeight(3);
  text("Umbralis Count: " + fallingImages.length + " / " + totalImages, 20, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
