import { jsPDF } from 'jspdf';
import { titleColors, titleKeys, contentColors, contentKeys, textColors, hexToRgb } from '../../../Components/colors';

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

async function makePDF(syntheses) {
  const doc = new jsPDF();

  // Stylisation du PDF - Titre
  doc.setFontSize(16);
  doc.setTextColor(textColors.title);
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
  const rectangles = [
    { text: syntheses[1]?.synthesis ?? 'Pas de données', title: "Nouveaux entrants", color: contentColors.c2 },
    { text: syntheses[2]?.synthesis ?? 'Pas de données', title: "Produits de substitution", color: contentColors.c3 },
    { text: syntheses[3]?.synthesis ?? 'Pas de données', title: "Pouvoir des fournisseurs", color: contentColors.c4 },
    { text: syntheses[4]?.synthesis ?? 'Pas de données', title: "Pouvoir des clients", color: contentColors.c5 }
  ];

  drawRectangleWithText(doc, CENTER_X, CENTER_Y - CIRCLE_RADIUS - RECT_OFFSET - 15, rectangles[0]);
  drawRectangleWithText(doc, CENTER_X, CENTER_Y + CIRCLE_RADIUS + RECT_OFFSET + 15, rectangles[1]);
  drawRectangleWithText(doc, CENTER_X - CIRCLE_RADIUS - RECT_OFFSET, CENTER_Y, rectangles[2]);
  drawRectangleWithText(doc, CENTER_X + CIRCLE_RADIUS + RECT_OFFSET, CENTER_Y, rectangles[3]);

  // Dessiner toutes les flèches à la fin
  drawAllArrows(doc, rectangles);
}

function drawCentralCircle(doc, centralSynthesis) {
  const [r, g, b] = hexToRgb(contentColors.c1);
  doc.setDrawColor(0, 0, 255);
  doc.setFillColor(r, g, b);
  doc.circle(CENTER_X, CENTER_Y, CIRCLE_RADIUS, 'F');

  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(textColors.title);
  const circleTitle = "Rivalité interne";
  doc.text(circleTitle, CENTER_X, CENTER_Y - CIRCLE_RADIUS - TITLE_OFFSET, { align: "center" });

  const titleWidth = doc.getStringUnitWidth(circleTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const underlineYPosition = CENTER_Y - CIRCLE_RADIUS - UNDERLINE_OFFSET;
  doc.setDrawColor(textColors.title);
  doc.line(CENTER_X - titleWidth / 2, underlineYPosition, CENTER_X + titleWidth / 2, underlineYPosition);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textColors.text);
  const centralText = centralSynthesis?.synthesis ?? 'Pas de données';
  const centralLines = splitTextIntoLines(doc, centralText, CIRCLE_RADIUS * 2);
  const lineHeight = doc.internal.getLineHeight() * interligne;
  centralLines.forEach((line, index) => {
    const yOffset = (index - (centralLines.length - 1) / 2) * lineHeight;
    doc.text(line, CENTER_X, CENTER_Y + yOffset, { align: "center" });
  });
}

function drawRectangleWithText(doc, x, y, { text, title, color }) {
  const [r, g, b] = hexToRgb(color);
  doc.setFillColor(r, g, b);
  doc.setDrawColor(0, 0, 0);
  doc.rect(x - RECT_WIDTH / 2, y - RECT_HEIGHT / 2, RECT_WIDTH, RECT_HEIGHT, 'F');

  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(textColors.title);
  doc.text(title, x, y - RECT_HEIGHT / 2 - TITLE_OFFSET, { align: "center" });

  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const underlineYPosition = y - RECT_HEIGHT / 2 - TITLE_OFFSET + UNDERLINE_OFFSET;
  doc.setDrawColor(textColors.title);
  doc.line(x - titleWidth / 2, underlineYPosition, x + titleWidth / 2, underlineYPosition);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textColors.text);
  drawMultilineText(doc, text, x, y, RECT_WIDTH);
}

function drawAllArrows(doc, rectangles) {
  drawArrow(doc, CENTER_X, CENTER_Y - CIRCLE_RADIUS - RECT_OFFSET - 15, 'down', rectangles[0].color);
  drawArrow(doc, CENTER_X, CENTER_Y + CIRCLE_RADIUS + RECT_OFFSET + 15, 'up', rectangles[1].color);
  drawArrow(doc, CENTER_X - CIRCLE_RADIUS - RECT_OFFSET, CENTER_Y, 'right', rectangles[2].color);
  drawArrow(doc, CENTER_X + CIRCLE_RADIUS + RECT_OFFSET, CENTER_Y, 'left', rectangles[3].color);
}

function drawArrow(doc, x, y, direction, color) {
  const [r, g, b] = hexToRgb(color);
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
  if (!text) {
    return []; // Return an empty array if text is undefined or null
  }
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