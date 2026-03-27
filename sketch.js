let genres, parts, types, materials;

// UI elements
let typeSelect, genreSelect;

// Scale + layout
const s = 20;
const originX = 100;
const originY = 550;

function preload() {
  genres = loadJSON("/docs/genres.json");
  parts = loadJSON("/docs/parts.json");
  types = loadJSON("/docs/types.json");
  materials = loadJSON("/docs/materials.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}


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
// GET PART HEIGHT
// -------------------------
function getPartHeight(part, typeId) {
  const p = part.parameters;

  // FIXED HEIGHT
  if (part.heightMode === "fixed") {
    return p.height;
  }

  // SPECIAL CASE: Insert-only mode
  if (typeId === "insert") {
    if (part.id === "insert-cartridge") {
      const shell = parts.parts.find(p => p.id === "shell");
      const defaultShellHeight = shell.heightByType["standard"];
      return defaultShellHeight - 1;
    }
  }

  // VARIABLE HEIGHT BY TYPE
  if (part.heightMode === "variable") {
    return part.heightByType[typeId];
  }

  // RELATIVE HEIGHT (e.g., cartridge = shell - 1)
  if (part.heightMode === "relative") {
    const refPart = parts.parts.find(x => x.id === part.relativeTo);
    const refHeight = getPartHeight(refPart, typeId);
    return refHeight + part.offset;
  }

  return 0;
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

  // --- DRAW ---
  let y = originY;

  type.parts.forEach(partId => {
    const part = parts.parts.find(p => p.id === partId);
    if (part) {
      y = drawPart(part, typeId, colorPrimary, colorSecondary, y);
    }
  });
}

// -------------------------
// DRAW INDIVIDUAL PART
// -------------------------
function drawPart(part, typeId, colorPrimary, colorSecondary, y) {
  const p = part.parameters;
  const currentType = typeSelect.value();

  const heightUnits = getPartHeight(part, typeId);
  const height = heightUnits * s;
  const diameter = p.diameter * s;

  const roundTop = (p.roundTop || 0) * s;
  const roundBottom = (p.roundBottom || 0) * s;

  // UNIVERSAL CENTERING (always use shell diameter)
  const shell = parts.parts.find(p => p.id === "shell");
  const maxDiameter = shell.parameters.diameter * s;
  const x = originX + (maxDiameter - diameter) / 2;

  // -------------------------
  // VISIBILITY RULES
  // -------------------------

  // Insert-only mode hides shell + cap
  if (currentType === "insert") {
    if (part.id === "shell") return y;
    if (part.id === "cap") return y;
  }

  // Normal modes hide dispenser + cartridge
  if (currentType !== "insert") {
    if (part.id === "insert-cartridge") return y;
    if (part.id === "insert-dispenser") return y;
  }

  // -------------------------
  // INSERT BODY (neck + body)
  // -------------------------
  if (part.id === "insert-body") {
    const neckD = p.neckDiameter * s;
    const neckH = p.neckHeight * s;

    const neckX = originX + (maxDiameter - neckD) / 2;

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

    // Draw neck (centered)
    rect(neckX, y - height, neckD, neckH);

    // Draw body (centered)
    rect(
      x,
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
  // NORMAL PART DRAWING (centered)
  // -------------------------

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
    x,
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