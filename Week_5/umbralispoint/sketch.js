function preload() {
  img = loadImage('data/UmbralisF.png');
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  smallPoint = 4;
  largePoint = 40;
  imageMode(CENTER);
  noStroke();
  background(255);
  img.loadPixels();
}

function draw(){
  let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  let x = floor(random(width));
  let y = floor(random(height));
  let pix = img.get(x,y);
  fill(pix, 128);
  ellipse(x, y, pointillize, pointillize);
}