let genres, parts, types, materials;

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

  if (!type || !genre) return;

  const colorPrimary = hexToRgb(genre.colors.primary);
  const colorSecondary = hexToRgb(genre.colors.secondary);

  // --- DYNAMIC SHELL HEIGHT (only for types with shell + cap) ---
  const shellPart = parts.parts.find(p => p.id === "shell");
  const capPart = parts.parts.find(p => p.id === "cap");

  if (shellPart && capPart && typeId !== "insert") {
    const insertBody = parts.parts.find(p => p.id === "insert-body");
    const insertCartridge = parts.parts.find(p => p.id === "insert-cartridge");
    const insertDispenser = parts.parts.find(p => p.id === "insert-dispenser");

    const insertTotalH =
      insertBody.parameters.height +
      insertCartridge.parameters.height +
      insertDispenser.parameters.height;

    const typeHeight = type.parameters.height;
    const capH = capPart.parameters.height;

    shellPart.parameters.height =
      typeHeight - (insertTotalH + capH);
  }

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
  const currentType = typeSelect.value();

  const diameter = p.diameter * s;
  const height = p.height * s;

  const roundTop = (p.roundTop || 0) * s;
  const roundBottom = (p.roundBottom || 0) * s;

  // -------------------------
  // INSERT VISIBILITY RULES
  // -------------------------

  // Cartridge + Dispenser hidden unless insert-only mode
  if (currentType !== "insert") {
    if (part.id === "insert-cartridge") return y;
    if (part.id === "insert-dispenser") return y;
  }

  // Insert-body is ALWAYS visible in normal modes
  // but must draw neck + body
  if (part.id === "insert-body") {
    const neckD = p.neckDiameter * s;
    const neckH = p.neckHeight * s;

    // MATERIAL LOOKUP
    const material = materials.materials.find(m => m.id === part.material);
    let fillColor;

    if (material.appearance.useGenreColor) {
      fillColor = colorSecondary;
    } else if (material.appearance.baseColor) {
      fillColor = hexToRgb(material.appearance.baseColor);
    } else {
      fillColor = [150, 150, 150];
    }

    fill(...fillColor);

    // Draw neck
    rect(
      originX + (diameter - neckD) / 2,
      y - height,
      neckD,
      neckH
    );

    // Draw body
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

    return y - height;
  }

  // -------------------------
  // NORMAL PART DRAWING
  // -------------------------

  // MATERIAL LOOKUP
  const material = materials.materials.find(m => m.id === part.material);
  let fillColor;

  if (material && material.appearance.useGenreColor) {
    fillColor = colorSecondary;
  } else if (material && material.appearance.baseColor) {
    fillColor = hexToRgb(material.appearance.baseColor);
  } else {
    fillColor = [150, 150, 150];
  }

  fill(...fillColor);

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