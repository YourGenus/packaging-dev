let genres, parts, types;

// UI elements
let typeSelect, genreSelect;

// Scale + layout
const s = 20;
const originX = 100;
const originY = 550;

function preload() {
  genres = loadJSON("../../docs/genres.json");
  parts = loadJSON("../../docs/parts.json");
  types = loadJSON("../../docs/types.json");
  materials = loadJSON("../../docs/materials.json");
}

function setup() {
  createCanvas(400, 700);

  // --- TYPE SELECT ---
  typeSelect = createSelect();
  typeSelect.position(20, 20);
  types.types.forEach(t => typeSelect.option(t.name, t.id));
  typeSelect.changed(redraw);

  // --- GENRE SELECT ---
  genreSelect = createSelect();
  genreSelect.position(200, 20);
  genres.genres.forEach(g => genreSelect.option(g.name, g.id));
  genreSelect.changed(redraw);

  noLoop();
}

function draw() {
  background(255);

  const selectedType = typeSelect.value();
  const selectedGenre = genreSelect.value();

  drawBottle(selectedType, selectedGenre);
}

// -------------------------
// DRAW BOTTLE
// -------------------------
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

// -------------------------
// DRAW INDIVIDUAL PART
// -------------------------
function drawPart(part, colorPrimary, colorSecondary, y) {
  const p = part.parameters;

  const diameter = p.diameter * s;
  const height = p.height * s;

  const roundTop = (p.roundTop || 0) * s;
  const roundBottom = (p.roundBottom || 0) * s;

  // MATERIAL LOOKUP
  const material = materials.materials.find(m => m.id === part.material);

  let fillColor;

  // PCR uses genre color
  if (material.appearance.useGenreColor) {
    fillColor = colorSecondary;
  }

  // Aluminum uses its own base color
  else if (material.appearance.baseColor) {
    fillColor = hexToRgb(material.appearance.baseColor);
  }

  // fallback
  else {
    fillColor = [150, 150, 150];
  }

  fill(...fillColor);


  // INSERT special case
  if (part.id === "insert") {
    const neckD = p.neckDiameter * s;
    const neckH = p.neckHeight * s;

    // Neck
    rect(
      originX + (diameter - neckD) / 2,
      y - height,
      neckD,
      neckH
    );

    // Body
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
    // Normal part
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

// -------------------------
// HEX → RGB
// -------------------------
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255
  ];
}