var kusamaColours=["pink", "green", "yellow", "blue", "red"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //background(255, 0, 0);
  //stroke(255, 0, 0);
  noStroke();
  frameRate(10);
     background(255, 220, 0);

}


function draw() {
  background(255, 220, 0);
  for (let i=0; i<50; i++) {
   //fill(random(255), random(255), random(255));
   fill (random(kusamaColours));
   square(random(width), random(height), random(200));
   fill (random(kusamaColours));
   ellipse(random(width), random(height), random(200));
   stroke(0);
   strokeWeight(random(4));
   line(random(1000), random(1000), mouseX, mouseY);
  }
  //noLoop(50);
   //fill("pink");
   //circle(250, 600, 200);
}