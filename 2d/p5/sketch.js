// =========================
// GENUS BOTTLE MODEL
// =========================

// Main parameters
let mainD = 6;             // main diameter
let neckD = mainD - 1;     // neck diameter
let mainRound = 0.5;       // main round
let secondaryRound = 0.25; // secondary round
let fitRound = 0.05;       // fit round

// Heights
let capH = 7;
let insertH = 5;
let neckH = 0.8;           // necking height
let shellH = 10;

// Scale
let s = 20;

function setup() {
  createCanvas(300, 600);
  noLoop();
}

function draw() {
  background(255);

  const aluminum = [200, 200, 200];
  const pcr = [255, 140, 0];

  let x = 100; // left position
  let y = 500; // bottom reference

  // -------------------------
  // SHELL (bottom)
  // -------------------------
  fill(...aluminum);
  rect(
    x,
    y - shellH * s,
    mainD * s,
    shellH * s,
    fitRound * s,
    fitRound * s,
    mainRound * s,
    mainRound * s
  );

  // -------------------------
  // INSERT (middle)
  // -------------------------

  // 1. Necking (top of insert)
  fill(...pcr);
  rect(
    x + (mainD - neckD) * 0.5 * s,
    y - shellH * s - insertH * s,
    neckD * s,
    neckH * s
  );

  // 2. Lower insert (full diameter)
  rect(
    x,
    y - shellH * s - insertH * s + neckH * s,
    mainD * s,
    (insertH - neckH) * s,
    secondaryRound * s,
    secondaryRound * s,
    fitRound * s,
    fitRound * s
  );

  // -------------------------
  // CAP (top)
  // -------------------------
  fill(...aluminum);
  rect(
    x,
    y - shellH * s - insertH * s - capH * s,
    mainD * s,
    capH * s,
    mainRound * s,
    mainRound * s,
    secondaryRound * s,
    secondaryRound * s
  );
}