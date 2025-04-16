var picCrazy;

function preload(){
  picCrazy=loadImage("data/bgcrazy.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(60);
}


function draw() {
  background(0, 20);
  let posX=mouseX;
  let posY=mouseY;
  scale(0.25);
  image(picCrazy, random(5000), random(5000));

}