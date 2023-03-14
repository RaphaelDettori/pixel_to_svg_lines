
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = './public/portraitW.jpg';
img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  const pixelValues = []; // Tableau pour stocker les valeurs des pixels
  const numPixels = canvas.width * canvas.height;
  const rowLength = canvas.width * 4;
  const lineSpacing = 2; // Espacement entre les lignes
  const numLines = 50; // Nombre de lignes

  // Division de l'image en lignes horizontales
  for (let l = 0; l < numLines; l++) {
    const rowStart = Math.floor((l / numLines) * canvas.height) * canvas.width * 4;
    const row = [];
    for (let i = 0; i < rowLength; i += 4 * lineSpacing) {
      const value = pixels[rowStart + i] > 128 ? 0 : 1;
      row.push(value);
    }
    pixelValues.push(row);
  }

  // Création des traits SVG
  const svgns = 'http://www.w3.org/2000/svg';
  const svgContainer = document.getElementById('svg-container');
  const svgWidth = canvas.width;
  const svgHeight = canvas.height;
  const lineStartX = 0;
  const lineEndX = svgWidth;
  const lineSpacingY = svgHeight / numLines;
  for (let l = 0; l < numLines; l++) {
    const lineStartY = l * lineSpacingY;
    const lineEndY = lineStartY;
    const line = document.createElementNS(svgns, 'path');
    const pathData = 'M' + lineStartX + ' ' + lineStartY + ' L' + lineEndX + ' ' + lineEndY;
    line.setAttribute('d', pathData);
    line.setAttribute('stroke-width', 1);
    line.setAttribute('x1', lineStartX);
    line.setAttribute('y1', lineStartY);
    line.setAttribute('x2', lineEndX);
    line.setAttribute('y2', lineEndY);
    line.setAttribute("fill", 'none')
    line.classList.add('myPath');
    svgContainer.appendChild(line);
  }

  // Mettre à jour les courbes de Bézier pour chaque ligne de pixels
  const svgLines = document.querySelectorAll('path');
  const bezierParams = {
    black: { dx1: -2, dy1: 1, dx2: -2, dy2: -20 },
    white: { dx1: 0, dy1: 0, dx2: 0, dy2: 0 }
  }; // Paramètres de courbe pour pixels noirs et blancs
  for (let i = 0; i < svgLines.length; i++) {
    const svgLine = svgLines[i];
    const row = pixelValues[i];
    if (row.includes(1)) { // S'il y a des pixels blancs dans la ligne
      let pathData = 'M' + svgLine.getAttribute('x1') + ' ' + svgLine.getAttribute('y1') + ' ';
      for (let j = 0; j < row.length; j++) {
        const x = parseFloat(svgLine.getAttribute('x1')) + j * lineSpacing;
        const y = parseFloat(svgLine.getAttribute('y1'));
        if (row[j] === 1) { // S'il y a un pixel noir à cet emplacement
          pathData += 'C' + (x + bezierParams.black.dx1) + ' ' + (y + bezierParams.black.dy1) + ' ' + (x + bezierParams.black.dx2) + ' ' + (y + bezierParams.black.dy2) + ' ' + (x + 1) + ' ' + y + ' ';
        } else { // S'il y a un pixel blanc à cet emplacement
          pathData += 'L' + (x + 1) + ' ' + y + ' ';
        }
      }
      svgLine.setAttribute('d', pathData);
    } else { // S'il n'y a pas de pixels blancs dans la ligne
      svgLine.setAttribute('d', 'M' + svgLine.getAttribute('x1') + ' ' + svgLine.getAttribute('y1') + ' L' + svgLine.getAttribute('x2') + ' ' + svgLine.getAttribute('y2'));
    }
  }

}
