/**
 * Читает SVG из stdin, заменяет ID, пишет в public/ton-promo-art.svg
 * Usage: type your.svg | node scripts/apply-svg.js
 */
const fs = require('fs');
const path = require('path');

let svg = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { svg += chunk; });
process.stdin.on('end', () => {
  svg = svg.replace(/:rfg:([a-zA-Z0-9_]+)_linear_7284_4512/g, 'ton-promo-$1');
  svg = svg.replace(/:rfg:([a-zA-Z0-9_]+)_7284_4512/g, 'ton-promo-$1');
  const defsM = svg.match(/<defs>[\s\S]*?<\/defs>/);
  if (defsM) {
    svg = svg.replace(/<defs>[\s\S]*?<\/defs>\s*/, '');
    svg = svg.replace(/<svg([^>]*)>/, `<svg$1>\n  ${defsM[0]}`);
  }
  if (!svg.includes('preserveAspectRatio')) {
    svg = svg.replace(/viewBox="([^"]+)"/, 'viewBox="$1" preserveAspectRatio="xMidYMid meet"');
  }
  svg = svg.replace(/style="mask-type: alpha"/g, 'style="mask-type:alpha"');
  const out = path.join(__dirname, '..', 'public', 'ton-promo-art.svg');
  fs.writeFileSync(out, svg, 'utf8');
  console.log('OK:', out);
});
