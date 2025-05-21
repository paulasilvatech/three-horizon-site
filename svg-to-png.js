const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Define input and output paths
const svgPath = path.join(__dirname, 'static', 'img', 'diagrams', 'microservices-architecture.svg');
const pngPath = path.join(__dirname, 'static', 'img', 'diagrams', 'microservices-architecture.png');

// Read the SVG file
const svgBuffer = fs.readFileSync(svgPath);

// Convert SVG to PNG
sharp(svgBuffer)
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log(`Successfully converted SVG to PNG: ${pngPath}`);
  })
  .catch(err => {
    console.error('Error converting SVG to PNG:', err);
  }); 