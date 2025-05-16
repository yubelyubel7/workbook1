let x;
let y;
let xspeed;
let yspeed;
let dvd;
let r, g, b;
let scale = 0.15; 

function preload() {
  dvd = loadImage("data/dvdlogo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(width);
  y = random(height);
  xspeed = 10;
  yspeed = 10;
  pickColor();
}

function pickColor() {
  r = random(100, 256);
  g = random(100, 256);
  b = random(100, 256);
}

function draw() {
  background(0);
  
  let scaledWidth = dvd.width * scale;
  let scaledHeight = dvd.height * scale;
  
  tint(r, g, b);
  image(dvd, x, y, scaledWidth, scaledHeight);

  x = x + xspeed;
  y = y + yspeed;

  if (x + scaledWidth >= width) {
    xspeed = -xspeed;
    x = width - scaledWidth;
    pickColor();
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
    pickColor();
  }

  if (y + scaledHeight >= height) {
    yspeed = -yspeed;
    y = height - scaledHeight;
    pickColor();
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
    pickColor();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//edited and then credit from https://thecodingtrain.com/CodingChallenges/131-bouncing-dvd-logo.html //

