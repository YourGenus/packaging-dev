let genres, parts, types;

// Scale + layout
const s = 20;
const originX = 100;
const originY = 600;

function preload() {
  genres = loadJSON("../../docs/genres.json");
  parts = loadJSON("../../docs/parts.json");
  types = loadJSON("../../docs/types.json");
}

function setup() {
  createCanvas(400, 700);
  noLoop();
}

function draw() {
  background(255);

  drawBottle("extended", "traveler");
}

function drawBottle(typeId, genreId) {
  const type = types.types.find(t => t.id === typeId);
  const genre = genres.genres.find(g => g.id === genreId);

  if (!type || !genre) {
    console.error("Invalid type or genre");
    return;
  }

  const colorPrimary = hexToRgb(genre.colors.primary);
  const colorSecondary = hexToRgb(genre.colors.secondary);

  // --- DYNAMIC SHELL HEIGHT ---
  const shellPart = parts.parts.find(p => p.id === "shell");
  const insertPart = parts.parts.find(p => p.id === "insert");
  const capPart = parts.parts.find(p => p.id === "cap");

  const typeHeight = type.parameters.height;
  const insertH = insertPart.parameters.height;
  const capH = capPart.parameters.height;

  shellPart.parameters.height = typeHeight - (insertH + capH);

  // --- DRAW ---
  let y = originY;

  type.parts.forEach(partId => {
    const part = parts.parts.find(p => p.id === partId);
    if (part) {
      y = drawPart(part, colorPrimary, colorSecondary, y);
    }
  });
}

function drawPart(part, colorPrimary, colorSecondary, y) {
  const p = part.parameters;

  const diameter = p.diameter * s;
  const height = p.height * s;

  const roundTop = (p.roundTop || 0) * s;
  const roundBottom = (p.roundBottom || 0) * s;

  // MATERIAL COLORS
  let fillColor;

  if (part.material === "PCR") {
    // PCR uses genre color
    fillColor = colorSecondary;
  } else if (part.material === "Aluminum") {
    // Aluminum uses fixed metal color
    fillColor = [220, 220, 220];
  } else {
    // fallback
    fillColor = [150, 150, 150];
  }

  fill(...fillColor);

  // INSERT special case
  if (part.id === "insert") {
    const neckD = p.neckDiameter * s;
    const neckH = p.neckHeight * s;

    rect(
      originX + (diameter - neckD) / 2,
      y - height,
      neckD,
      neckH
    );

    rect(
      originX,
      y - height + neckH,
      diameter,
      height - neckH,
      roundTop,
      roundTop,
      roundBottom,
      roundBottom
    );

  } else {
    rect(
      originX,
      y - height,
      diameter,
      height,
      roundTop,
      roundTop,
      roundBottom,
      roundBottom
    );
  }

  return y - height;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255
  ];
}