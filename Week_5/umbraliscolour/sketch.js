let bottomImg, topImg;

function preload() {
 bottomImg = loadImage('./data/UmbralisFBW.png');
 topImg = loadImage('./data/UmbralisF.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(160,20,70);
  topImg.resize(width, height);
  image(bottomImg, 0, 0, width, height,);

}


function mouseDragged(){
  copy(topImg, mouseX, mouseY, 50, 50, mouseX, mouseY, 50, 50);
}