import { jsPDF } from 'jspdf';

// Constantes pour la mise en page
const TITLE_Y_POSITION = 15;
const CENTER_X = 105;
const CENTER_Y = 150;
const CIRCLE_RADIUS = 30;
const RECT_WIDTH = 40;
const RECT_HEIGHT = 70;
const RECT_OFFSET = 45; // Distance entre le centre et les rectangles
const TITLE_OFFSET = 2; // Distance entre les rectangles et leurs titres
const UNDERLINE_OFFSET = 1; // Décalage pour le soulignement
const interligne = 0.3;
const ARROW_LINE_WIDTH = 0; // Épaisseur du trait de la flèche

const arrowColor1 = "#f04424";
const arrowColor2 = "#ff5c54";
const arrowColor3 = "#f88c24";
const arrowColor4 = "#f8bc04";
const circleColor = "#f8d404";

const [ra1, ga1, ba1] = hexToRgb(arrowColor1);
const [ra2, ga2, ba2] = hexToRgb(arrowColor2);
const [ra3, ga3, ba3] = hexToRgb(arrowColor3);
const [ra4, ga4, ba4] = hexToRgb(arrowColor4);
const [rc, gc, bc] = hexToRgb(circleColor);

// Fonction pour convertir un code hexadécimal en valeurs RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

async function makePDF(syntheses) {
  const doc = new jsPDF();

  // Stylisation du PDF - Titre
  doc.setFontSize(16);
  doc.text("Schéma des 5 Forces de Porter", CENTER_X, TITLE_Y_POSITION, null, null, "center");

  // Dessiner le schéma des 5 forces de Porter
  drawPorterDiagram(doc, syntheses);

  // Sauvegarder le PDF
  doc.save("syntheses-forces-porter.pdf");
}

function drawPorterDiagram(doc, syntheses) {
  // Dessiner le cercle central
  drawCentralCircle(doc, syntheses[0]);

  // Dessiner les rectangles et leur texte
  const topText = syntheses[1] ? syntheses[1].synthesis : 'Pas de données';
  const bottomText = syntheses[2] ? syntheses[2].synthesis : 'Pas de données';
  const leftText = syntheses[3] ? syntheses[3].synthesis : 'Pas de données';
  const rightText = syntheses[4] ? syntheses[4].synthesis : 'Pas de données';

  drawRectangleWithText(doc, CENTER_X, CENTER_Y - CIRCLE_RADIUS - RECT_OFFSET - 15, topText, "Nouveaux entrants", [ra1, ga1, ba1]);
  drawRectangleWithText(doc, CENTER_X, CENTER_Y + CIRCLE_RADIUS + RECT_OFFSET + 15, bottomText, "Produits de substitution", [ra2, ga2, ba2]);
  drawRectangleWithText(doc, CENTER_X - CIRCLE_RADIUS - RECT_OFFSET, CENTER_Y, leftText, "Pouvoir des fournisseurs", [ra3, ga3, ba3]);
  drawRectangleWithText(doc, CENTER_X + CIRCLE_RADIUS + RECT_OFFSET, CENTER_Y, rightText, "Pouvoir des clients", [ra4, ga4, ba4]);

  // Dessiner toutes les flèches à la fin
  drawAllArrows(doc);
}

function drawCentralCircle(doc, centralSynthesis) {
  doc.setDrawColor(0, 0, 255);
  doc.setFillColor(rc, gc, bc);
  doc.circle(CENTER_X, CENTER_Y, CIRCLE_RADIUS, 'F');

  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  const circleTitle = "Rivalité interne";
  doc.text(circleTitle, CENTER_X, CENTER_Y - CIRCLE_RADIUS - TITLE_OFFSET, { align: "center" });

  const titleWidth = doc.getStringUnitWidth(circleTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const underlineYPosition = CENTER_Y - CIRCLE_RADIUS - UNDERLINE_OFFSET;
  doc.setDrawColor(0, 0, 0);
  doc.line(CENTER_X - titleWidth / 2, underlineYPosition, CENTER_X + titleWidth / 2, underlineYPosition);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  const centralText = centralSynthesis ? centralSynthesis.synthesis : 'Pas de données';
  const centralLines = splitTextIntoLines(doc, centralText, CIRCLE_RADIUS * 2);
  const lineHeight = doc.internal.getLineHeight() * interligne;
  centralLines.forEach((line, index) => {
      const yOffset = (index - (centralLines.length - 1) / 2) * lineHeight;
      doc.text(line, CENTER_X, CENTER_Y + yOffset, { align: "center" });
  });
}

function drawRectangleWithText(doc, x, y, text, title, color) {
  const [r, g, b] = color;
  doc.setFillColor(r, g, b);
  doc.setDrawColor(0, 0, 0);
  doc.rect(x - RECT_WIDTH / 2, y - RECT_HEIGHT / 2, RECT_WIDTH, RECT_HEIGHT, 'F');

  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(title, x, y - RECT_HEIGHT / 2 - TITLE_OFFSET, { align: "center" });

  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const underlineYPosition = y - RECT_HEIGHT / 2 - TITLE_OFFSET + UNDERLINE_OFFSET;
  doc.setDrawColor(0, 0, 0);
  doc.line(x - titleWidth / 2, underlineYPosition, x + titleWidth / 2, underlineYPosition);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  drawMultilineText(doc, text, x, y, RECT_WIDTH);
}

function drawAllArrows(doc) {
  drawArrow(doc, CENTER_X, CENTER_Y - CIRCLE_RADIUS - RECT_OFFSET - 15, 'down', [ra1, ga1, ba1]);
  drawArrow(doc, CENTER_X, CENTER_Y + CIRCLE_RADIUS + RECT_OFFSET + 15, 'up', [ra2, ga2, ba2]);
  drawArrow(doc, CENTER_X - CIRCLE_RADIUS - RECT_OFFSET, CENTER_Y, 'right', [ra3, ga3, ba3]);
  drawArrow(doc, CENTER_X + CIRCLE_RADIUS + RECT_OFFSET, CENTER_Y, 'left', [ra4, ga4, ba4]);
}

function drawArrow(doc, x, y, direction, color) {
  const [r, g, b] = color;
  doc.setDrawColor(r, g, b);
  doc.setFillColor(r, g, b);
  doc.setLineWidth(ARROW_LINE_WIDTH);

  const gap = 5;
  const arrowHeadSize = 5;
  const arrowHeadOffset = ARROW_LINE_WIDTH / 2;

  let startX, startY, endX, endY;

  switch (direction) {
      case 'up':
          startX = x;
          startY = y - RECT_HEIGHT / 2 - gap;
          endX = x;
          endY = CENTER_Y + CIRCLE_RADIUS + gap + arrowHeadOffset;
          break;
      case 'down':
          startX = x;
          startY = y + RECT_HEIGHT / 2 + gap;
          endX = x;
          endY = CENTER_Y - CIRCLE_RADIUS - gap - arrowHeadOffset;
          break;
      case 'left':
          startX = x - RECT_WIDTH / 2 - gap;
          startY = y;
          endX = CENTER_X + CIRCLE_RADIUS + gap + arrowHeadOffset;
          endY = y;
          break;
      case 'right':
          startX = x + RECT_WIDTH / 2 + gap;
          startY = y;
          endX = CENTER_X - CIRCLE_RADIUS - gap - arrowHeadOffset;
          endY = y;
          break;
  }

  doc.line(startX, startY, endX, endY);

  let angle;
  switch (direction) {
      case 'down':
          angle = Math.PI / 2;
          break;
      case 'up':
          angle = -Math.PI / 2;
          break;
      case 'right':
          angle = 0;
          break;
      case 'left':
          angle = Math.PI;
          break;
  }

  const arrowHead = [
      [endX - arrowHeadSize * Math.cos(angle - Math.PI / 6), endY - arrowHeadSize * Math.sin(angle - Math.PI / 6)],
      [endX, endY],
      [endX - arrowHeadSize * Math.cos(angle + Math.PI / 6), endY - arrowHeadSize * Math.sin(angle + Math.PI / 6)]
  ];

  doc.triangle(arrowHead[0][0], arrowHead[0][1], arrowHead[1][0], arrowHead[1][1], arrowHead[2][0], arrowHead[2][1], 'F');
}

function drawMultilineText(doc, text, x, y, maxWidth) {
  const lines = splitTextIntoLines(doc, text, maxWidth);
  const lineHeight = doc.internal.getLineHeight() * interligne;
  const verticalOffset = (lines.length * lineHeight) / 2;
  lines.forEach((line, index) => {
      doc.text(line, x, y - verticalOffset + index * lineHeight, { align: "center" });
  });
}

function splitTextIntoLines(doc, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];
  for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = doc.getStringUnitWidth(currentLine + " " + word) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}

export default makePDF;