let mic;
let size = 0.5;
let l = 400;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  noStroke();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0, 80);

  let spectrum = fft.analyze();

  push();
  translate(width * 0.5, height * 0.5);
  strokeWeight(1);
  stroke(255);
  noFill();
  ellipse(spectrum[125] * 0.05, 0, height * 0.5);
  ellipse(0, spectrum[125] * 0.05, height * 0.5);
  ellipse(-spectrum[30] * 0.05, 0, height * 0.5);
  ellipse(0, -spectrum[30] * 0.05, height * 0.5);
  ellipse(0, 0, height * 0.5);
  pop();

  TheWave(spectrum);
}

function TheWave(spectrum) {
  noFill();
  push();
  translate(width * 0.5, height * 0.5);

  let z = (frameCount % 500) / 500;
  for (let i = 0; i < 6; i++) {
    let n = floor(random(1, 3)) * random([-1, 1]);
    let h = random(5, l / 6);
    h *= -sq(2 * z - 1) + 1;
    stroke(i * 100, 80);
    strokeWeight(i);
    makeWave(n, spectrum[i] * size, spectrum[i] / 100);
  }
  pop();
}

function makeWave(n, h, sp) {
  push();
  let t = (TWO_PI * (frameCount % 500)) / 500;
  beginShape();
  for (let x = -l / 2; x < l / 2; x++) {
    let z = map(x, -l / 2, l / 2, 0, 1);
    let alpha = -sq(2 * z - 1) + 1;
    let off = sin((n * TWO_PI * (x + l / 2)) / l + sp * t) * h * alpha;
    curveVertex(x, off);
  }
  endShape();
  pop();
}
