const fs = require('fs');

// Create a simple Prism Writing favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#2563eb"/>
  <path d="M8 8h6c2.2 0 4 1.8 4 4s-1.8 4-4 4h-2v8h-4V8zm4 6h2c.6 0 1-.4 1-1s-.4-1-1-1h-2v2z" fill="white"/>
</svg>`;

// Write the SVG to favicon.svg
fs.writeFileSync('/home/spacecadet/Desktop/Master Folder/Ariel\'s/Repo/Programming/projects/prism-enterprise/public/favicon.svg', faviconSvg);

console.log('Created favicon.svg with Prism Writing logo');
