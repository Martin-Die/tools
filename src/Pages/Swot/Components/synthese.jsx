import { jsPDF } from 'jspdf';
import { titleColors, contentColors, textColors, hexToRgb } from '../../../Components/colors';

// Constantes pour la mise en page
const TITLE_Y_POSITION = 15;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 10;
const SPACING = 5; // Espacement entre les quadrants
const QUADRANT_WIDTH = (PAGE_WIDTH - 2 * MARGIN - SPACING) / 2;
const QUADRANT_HEIGHT = (PAGE_HEIGHT - 2 * MARGIN - TITLE_Y_POSITION - SPACING) / 2;
const TITLE_HEIGHT = 10;
const RADIUS = 5; // Rayon pour arrondir les coins
const interligne = 0.3;

async function makePDF(syntheses) {
  const doc = new jsPDF();

  // Titre principal
  doc.setFontSize(16);
  doc.text("Analyse SWOT", PAGE_WIDTH / 2, TITLE_Y_POSITION, null, null, "center");

  // Dessiner le schéma SWOT
  drawSWOTDiagram(doc, syntheses);

  // Sauvegarder le PDF
  doc.save("synthese-swot.pdf");
}

function drawSWOTDiagram(doc, syntheses) {
  const titles = ["Forces", "Faiblesses", "Opportunités", "Menaces"];
  const titleColorValues = Object.values(titleColors).slice(0, 4);
  const contentColorValues = Object.values(contentColors).slice(0, 4);

  titles.forEach((title, index) => {
    const x = MARGIN + (QUADRANT_WIDTH + SPACING) * (index % 2);
    const y = TITLE_Y_POSITION + 10 + (QUADRANT_HEIGHT + SPACING) * Math.floor(index / 2);
    const text = syntheses[index]?.synthesis ?? 'Pas de données';
    const titleColor = titleColorValues[index] ?? '#CCCCCC';
    const contentColor = contentColorValues[index] ?? '#EEEEEE';

    drawQuadrantWithText(doc, x, y, title, text, titleColor, contentColor);
  });
}

function drawQuadrantWithText(doc, x, y, title, text, titleColor, contentColor) {
  const [titleR, titleG, titleB] = hexToRgb(titleColor);
  const [contentR, contentG, contentB] = hexToRgb(contentColor);

  // Dessiner le rectangle du contenu avec coins arrondis
  doc.setFillColor(contentR, contentG, contentB);
  doc.setDrawColor(0, 0, 0);
  doc.roundedRect(x, y, QUADRANT_WIDTH, QUADRANT_HEIGHT, RADIUS, RADIUS, 'F');

  // Dessiner le rectangle du titre en deux parties
  doc.setFillColor(titleR, titleG, titleB);
  // Partie supérieure arrondie
  doc.roundedRect(x, y, QUADRANT_WIDTH, TITLE_HEIGHT, RADIUS, RADIUS, 'F', [true, true, false, false]);
  // Partie inférieure rectangulaire
  doc.rect(x + 0.1, y + RADIUS, QUADRANT_WIDTH - 0.1, TITLE_HEIGHT - RADIUS, 'F');

  // Titre du quadrant
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(textColors.title ?? '#000000');
  doc.text(title, x + QUADRANT_WIDTH / 2, y + TITLE_HEIGHT / 2, { align: "center", baseline: "middle" });

  // Texte du quadrant
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(textColors.content ?? '#333333');
  drawMultilineText(doc, text, x + QUADRANT_WIDTH / 2, y + TITLE_HEIGHT + 5, QUADRANT_WIDTH - 4);
}

function drawMultilineText(doc, text, x, y, maxWidth) {
  const lines = splitTextIntoLines(doc, text, maxWidth);
  const lineHeight = doc.internal.getLineHeight() * interligne;

  lines.forEach((line, index) => {
    doc.text(line, x, y + index * lineHeight, { align: "center" });
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