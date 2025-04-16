function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(250, 250, 255);

  // 1) ELF EARS
  noStroke();
  fill(255, 192, 203);
  triangle(10, 400, 500, 300, 200, 500);
  triangle(800, 400, 500, 300, 600, 500);

  // 2) FACE
  fill(255, 192, 203);
  stroke(0);
  strokeWeight(5);
  ellipse(400, 400, 550, 450);

  noStroke();
  fill(0, 0, 255);
  beginShape();
    vertex(120, 140);
    vertex(220,  90);
    vertex(400,  60);
    vertex(580,  90);
    vertex(680, 140); 

    vertex(680, 260);
    vertex(590, 400);
    vertex(470, 275);
    vertex(400, 340);
    vertex(330, 275);
    vertex(210, 400);
    vertex(120, 260);
  endShape(CLOSE);


  fill(0, 0, 255);
  triangle(
    170, 180,
    80, 320,
    300, 320 );
  triangle(
    630, 180,
    720, 320,
    540, 320
  );

  let leftEyeX = 300;
  let rightEyeX = 500;
  let eyeY = 350;
  
  // White parts of the eyes
  fill(255, 255, 0);
  ellipse(leftEyeX, eyeY, 150, 80);
  ellipse(rightEyeX, eyeY, 150, 80);

  let maxPupilMove = 20;
  
  // For left eye
  let leftDx = mouseX - leftEyeX;
  let leftDy = mouseY - eyeY;
  let leftDist = sqrt(leftDx*leftDx + leftDy*leftDy);
  let leftPupilX = leftEyeX;
  let leftPupilY = eyeY;
  
  if (leftDist > 0) {
    leftPupilX += constrain(leftDx/leftDist * maxPupilMove, -maxPupilMove, maxPupilMove);
    leftPupilY += constrain(leftDy/leftDist * maxPupilMove, -maxPupilMove, maxPupilMove);
  }
  
  // For right eye
  let rightDx = mouseX - rightEyeX;
  let rightDy = mouseY - eyeY;
  let rightDist = sqrt(rightDx*rightDx + rightDy*rightDy);
  let rightPupilX = rightEyeX;
  let rightPupilY = eyeY;
  
  if (rightDist > 0) {
    rightPupilX += constrain(rightDx/rightDist * maxPupilMove, -maxPupilMove, maxPupilMove);
    rightPupilY += constrain(rightDy/rightDist * maxPupilMove, -maxPupilMove, maxPupilMove);
  }

  fill(255, 105, 180);
  circle(leftPupilX, leftPupilY, 70);
  circle(rightPupilX, rightPupilY, 70);

  fill(255);
  arc(400, 450, 200, 180, 0, PI, PIE);
}