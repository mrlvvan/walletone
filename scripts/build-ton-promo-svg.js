/**
 * Конвертирует оригинальный SVG в ton-promo-art.svg:
 * заменяет :rfg: на ton-promo- и _7284_4512 на пустую строку.
 * Запуск: node scripts/build-ton-promo-svg.js
 */

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'ton-promo-original.svg');
const outputPath = path.join(__dirname, '..', 'public', 'ton-promo-art.svg');

let svg = fs.readFileSync(inputPath, 'utf8');

// Замена ID (сначала _linear, иначе paint0_linear попадёт в первую замену)
svg = svg.replace(/:rfg:([a-zA-Z0-9_]+)_linear_7284_4512/g, 'ton-promo-$1');
svg = svg.replace(/:rfg:([a-zA-Z0-9_]+)_7284_4512/g, 'ton-promo-$1');

// Перемещаем defs в начало (если они в конце)
const defsMatch = svg.match(/<defs>[\s\S]*?<\/defs>/);
if (defsMatch) {
  const defs = defsMatch[0];
  svg = svg.replace(/<defs>[\s\S]*?<\/defs>\s*/, '');
  svg = svg.replace(/<svg([^>]*)>/, `<svg$1>\n  ${defs}`);
}

// Добавляем preserveAspectRatio если нет
if (!svg.includes('preserveAspectRatio')) {
  svg = svg.replace(/viewBox="([^"]+)"/, 'viewBox="$1" preserveAspectRatio="xMidYMid meet"');
}

// mask-type: alpha -> style="mask-type:alpha"
svg = svg.replace(/style="mask-type: alpha"/g, 'style="mask-type:alpha"');

fs.writeFileSync(outputPath, svg, 'utf8');
console.log('OK:', outputPath);
