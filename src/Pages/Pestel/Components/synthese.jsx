import { jsPDF } from 'jspdf';
import { titleColors, contentColors, textColors, hexToRgb } from '../../../Components/colors';

// Constantes pour la mise en page
const TITLE_Y_POSITION = 15;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 10;
const COLUMN_WIDTH = (PAGE_WIDTH - 2 * MARGIN) / 4;
const COLUMN_HEIGHT = PAGE_HEIGHT - 2 * MARGIN - TITLE_Y_POSITION + 300;
const TITLE_OFFSET = 5; // Décalage pour le texte du titre
const TITLE_HEIGHT = 60; // Nouvelle hauteur du rectangle du titre
const UNDERLINE_OFFSET = 1;
const INTERLIGNE = 0.3;

const titles = ["Politique", "Économique", "Socioculturel", "Technologique", "Écologique", "Légal"];

const pestelColors = [
  contentColors.c1,
  contentColors.c2,
  contentColors.c3,
  contentColors.c4,
  contentColors.c5,
  contentColors.c6
];

async function makePDF(syntheses = []) {
  const doc = new jsPDF();
  drawTitle(doc);
  drawPESTELDiagram(doc, syntheses);
  doc.save("synthese-pestel.pdf");
}

function drawTitle(doc) {
  doc.setFontSize(16);
  doc.setTextColor(textColors.title);
  doc.text("Analyse PESTEL", PAGE_WIDTH / 2, TITLE_Y_POSITION, { align: "center" });
}

function drawPESTELDiagram(doc, syntheses) {
  titles.forEach((title, index) => {
    const x = MARGIN + (COLUMN_WIDTH * index);
    const y = TITLE_Y_POSITION + TITLE_HEIGHT + 10; // Ajustement de la position Y pour le contenu
    const text = syntheses[index]?.synthesis ?? 'Pas de données';
    const color = pestelColors[index];
    drawColumnWithText(doc, x, y, title, text, color);
  });
}

function drawColumnWithText(doc, x, y, title, text, color) {
  drawColumn(doc, x, y, color);
  drawColumnTitle(doc, x, y - TITLE_HEIGHT, title); // Ajustement de la position Y pour le titre
  drawColumnText(doc, x, y, text);
}

function drawColumn(doc, x, y, color) {
  const [r, g, b] = hexToRgb(color);
  doc.setFillColor(r, g, b);
  doc.setDrawColor(0, 0, 0);

  // Dessiner la colonne principale sans inclure la hauteur du titre
  doc.rect(x, y - TITLE_HEIGHT + TITLE_OFFSET / 2, COLUMN_WIDTH, COLUMN_HEIGHT, 'F');
}

function drawColumnTitle(doc, x, y, title) {
  // Dessiner le rectangle du titre avec une hauteur suffisante
  doc.setFillColor(textColors.title); // Couleur de fond du titre
  doc.rect(x, y, COLUMN_WIDTH, TITLE_HEIGHT, 'F');

  // Titre du quadrant centré dans le rectangle
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(textColors.title);
  doc.text(title, x + COLUMN_WIDTH / 2, y + TITLE_HEIGHT / 2, { align: "center", baseline: "middle" });

  // Souligner le titre
  const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const underlineYPosition = y + TITLE_HEIGHT + UNDERLINE_OFFSET; // Position sous le titre
  doc.setDrawColor(textColors.title);
  doc.line(x + COLUMN_WIDTH / 2 - titleWidth / 2, underlineYPosition,
    x + COLUMN_WIDTH / 2 + titleWidth / 2, underlineYPosition);
}

function drawColumnText(doc, x, y, text) {
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textColors.text);
  drawMultilineText(doc, text, x + COLUMN_WIDTH / 2, y + 10, COLUMN_WIDTH - 4);
}

function drawMultilineText(doc, text, x, y, maxWidth) {
  const lines = splitTextIntoLines(doc, text, maxWidth);
  const lineHeight = doc.internal.getLineHeight() * INTERLIGNE;

  lines.forEach((line, index) => {
    doc.text(line, x, y + index * lineHeight, { align: "center" });
  });
}

function splitTextIntoLines(doc, text, maxWidth) {
  if (!text) return [];
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
