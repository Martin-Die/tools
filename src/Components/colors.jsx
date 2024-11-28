// colorUtils.js

// Couleurs pour chaque quadrant SWOT
export const titleColors = {
  t1: "#F04424",
  t2: "#F88C24",
  t3: "#F8BC04",
  t4: "#A8C424",
  t5: "#10A474",
  t6: "#189CDC",
  t7: "#8864DC",
  t8: "#E83CC4",
  t9: "#E80C64",
  t10: "#1C38E0",
  t11: "#08D4B4",
  t12: "#F8D404",
  t13: "#FF5C54",
  t14: "#3844DC",
};
export const titleKeys = Object.keys(titleColors);

export const contentColors = {
  c1: "#FF4C5C",
  c2: "#F0B484",
  c3: "#F8CC8C",
  c4: "#D0DC74",
  c5: "#90DCC4",
  c6: "#88D4FC",
  c7: "#B89CFC",
  c8: "#FFB4EC",
  c9: "#FF6C9C",
  c10: "#7494EC",
  c11: "#A8f4EC",
  c12: "#FFEC7C",
  c13: "#FF949C",
  c14: "#888CF4",
};
export const contentKeys = Object.keys(contentColors);

// Couleurs pour les titres et le texte
export const textColors = {
  title: "#000000",      // Noir
  text: "#333333"     // Gris foncé
};

export function hexToRgb(hex) {

  if (!hex) return [0, 0, 0]; // Retourne noir si hex est undefined ou null

  // Supprime le # si présent
  hex = hex.replace(/^#/, '');

  // Gère les formats courts (par exemple, "03F")
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}