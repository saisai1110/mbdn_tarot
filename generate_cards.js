const fs = require('fs');
const path = require('path');

const cards = [
  { num: '0', roman: '0', name: 'THE FOOL', id: 'the-fool' },
  { num: '1', roman: 'I', name: 'THE MAGICIAN', id: 'the-magician' },
  { num: '2', roman: 'II', name: 'THE HIGH PRIESTESS', id: 'the-high-priestess' },
  { num: '3', roman: 'III', name: 'THE EMPRESS', id: 'the-empress' },
  { num: '4', roman: 'IV', name: 'THE EMPEROR', id: 'the-emperor' },
  { num: '5', roman: 'V', name: 'THE HIEROPHANT', id: 'the-hierophant' },
  { num: '6', roman: 'VI', name: 'THE LOVERS', id: 'the-lovers' },
  { num: '7', roman: 'VII', name: 'THE CHARIOT', id: 'the-chariot' },
  { num: '8', roman: 'VIII', name: 'STRENGTH', id: 'strength' },
  { num: '9', roman: 'IX', name: 'THE HERMIT', id: 'the-hermit' },
  { num: '10', roman: 'X', name: 'WHEEL OF FORTUNE', id: 'wheel-of-fortune' },
  { num: '11', roman: 'XI', name: 'JUSTICE', id: 'justice' },
  { num: '12', roman: 'XII', name: 'THE HANGED MAN', id: 'the-hanged-man' },
  { num: '13', roman: 'XIII', name: 'DEATH', id: 'death' },
  { num: '14', roman: 'XIV', name: 'TEMPERANCE', id: 'temperance' },
  { num: '15', roman: 'XV', name: 'THE DEVIL', id: 'the-devil' },
  { num: '16', roman: 'XVI', name: 'THE TOWER', id: 'the-tower' },
  { num: '17', roman: 'XVII', name: 'THE STAR', id: 'the-star' },
  { num: '18', roman: 'XVIII', name: 'THE MOON', id: 'the-moon' },
  { num: '19', roman: 'XIX', name: 'THE SUN', id: 'the-sun' },
  { num: '20', roman: 'XX', name: 'JUDGEMENT', id: 'judgement' },
  { num: '21', roman: 'XXI', name: 'THE WORLD', id: 'the-world' },
];

const assetsDir = path.join(__dirname, 'assets', 'tarot');

// Generate missing SVGs
cards.forEach(c => {
  const uprightPath = path.join(assetsDir, `${c.id}-upright.svg`);
  const reversedPath = path.join(assetsDir, `${c.id}-reversed.svg`);

  // Upright SVG
  if (!fs.existsSync(uprightPath) && !fs.existsSync(path.join(assetsDir, `${c.id}-upright.png`)) && !fs.existsSync(path.join(assetsDir, `${c.id}-upright.jpg`))) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700" viewBox="0 0 400 700">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f0f4fa"/>
      <stop offset="50%" stop-color="#c8d8ee"/>
      <stop offset="100%" stop-color="#4a7fba"/>
    </linearGradient>
  </defs>
  <rect width="400" height="700" rx="16" fill="url(#bg)"/>
  <rect x="14" y="14" width="372" height="672" rx="10" fill="none" stroke="#b8a472" stroke-width="1" opacity="0.5"/>
  <rect x="24" y="24" width="352" height="652" rx="6" fill="none" stroke="#b8a472" stroke-width="0.5" opacity="0.25"/>
  <line x1="40" y1="90" x2="360" y2="90" stroke="#b8a472" stroke-width="0.5" opacity="0.2"/>
  <line x1="40" y1="610" x2="360" y2="610" stroke="#b8a472" stroke-width="0.5" opacity="0.2"/>
  <text x="200" y="65" font-family="Georgia, 'Times New Roman', serif" font-size="32" fill="#1a2a44" text-anchor="middle" letter-spacing="6" opacity="0.8">${c.roman}</text>
  <text x="200" y="345" font-family="Georgia, 'Times New Roman', serif" font-size="36" fill="#1a2a44" text-anchor="middle" letter-spacing="8" font-weight="400">${c.name}</text>
  <text x="200" y="380" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#1a2a44" text-anchor="middle" letter-spacing="10" opacity="0.45">UPRIGHT</text>
  <text x="200" y="645" font-family="Georgia, 'Times New Roman', serif" font-size="32" fill="#1a2a44" text-anchor="middle" letter-spacing="6" opacity="0.8">${c.roman}</text>
</svg>`;
    fs.writeFileSync(uprightPath, svg, 'utf8');
  }

  // Reversed SVG
  if (!fs.existsSync(reversedPath) && !fs.existsSync(path.join(assetsDir, `${c.id}-reversed.png`)) && !fs.existsSync(path.join(assetsDir, `${c.id}-reversed.jpg`))) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700" viewBox="0 0 400 700">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a1f1f"/>
      <stop offset="50%" stop-color="#4a2f2f"/>
      <stop offset="100%" stop-color="#8c4a4a"/>
    </linearGradient>
  </defs>
  <rect width="400" height="700" rx="16" fill="url(#bg)"/>
  <rect x="14" y="14" width="372" height="672" rx="10" fill="none" stroke="#b8a472" stroke-width="1" opacity="0.5"/>
  <rect x="24" y="24" width="352" height="652" rx="6" fill="none" stroke="#b8a472" stroke-width="0.5" opacity="0.25"/>
  <line x1="40" y1="90" x2="360" y2="90" stroke="#b8a472" stroke-width="0.5" opacity="0.2"/>
  <line x1="40" y1="610" x2="360" y2="610" stroke="#b8a472" stroke-width="0.5" opacity="0.2"/>
  <text x="200" y="65" font-family="Georgia, 'Times New Roman', serif" font-size="32" fill="#e8e4dc" text-anchor="middle" letter-spacing="6" opacity="0.8" transform="rotate(180 200 55)">${c.roman}</text>
  <text x="200" y="345" font-family="Georgia, 'Times New Roman', serif" font-size="36" fill="#e8e4dc" text-anchor="middle" letter-spacing="8" font-weight="400" transform="rotate(180 200 335)">${c.name}</text>
  <text x="200" y="380" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#e8e4dc" text-anchor="middle" letter-spacing="10" opacity="0.45" transform="rotate(180 200 375)">REVERSED</text>
  <text x="200" y="645" font-family="Georgia, 'Times New Roman', serif" font-size="32" fill="#e8e4dc" text-anchor="middle" letter-spacing="6" opacity="0.8" transform="rotate(180 200 635)">${c.roman}</text>
</svg>`;
    fs.writeFileSync(reversedPath, svg, 'utf8');
  }
});

// Update tarotData.js
let tarotDataStr = `/**
 * ============================================
 *  TAROT CARD DATA
 * ============================================
 *  所有塔羅牌資料集中管理於此。
 *  如需新增 / 修改牌卡，只需編輯此檔案。
 * ============================================
 */

var TarotData = {
  cards: [
`;

cards.forEach((c, idx) => {
  // Logic to determine image path: actual png/jpg or fallback svg
  const baseImgPath = path.join(assetsDir, `${c.id}-upright`);
  let uprightImage = \`assets/tarot/\${c.id}-upright.svg\`;
  if (fs.existsSync(baseImgPath + '.png')) uprightImage = \`assets/tarot/\${c.id}-upright.png\`;
  else if (fs.existsSync(baseImgPath + '.jpg')) uprightImage = \`assets/tarot/\${c.id}-upright.jpg\`;

  const baseRevImgPath = path.join(assetsDir, `${c.id}-reversed`);
  let reversedImage = \`assets/tarot/\${c.id}-reversed.svg\`;
  if (fs.existsSync(baseRevImgPath + '.png')) reversedImage = \`assets/tarot/\${c.id}-reversed.png\`;
  else if (fs.existsSync(baseRevImgPath + '.jpg')) reversedImage = \`assets/tarot/\${c.id}-reversed.jpg\`;

  let upText = \`這是\${c.name}的正位。請在此處填入您的作品說明。\`;
  let revText = \`這是\${c.name}的逆位。請在此處填入您的作品說明。\`;

  if (c.id === 'the-fool') {
    upText = '這是愚者牌的正位。代表新的開始、冒險與無限可能。';
    revText = '這是愚者牌的逆位。代表魯莽、冒險可能帶來的風險。';
  } else if (c.id === 'the-magician') {
    upText = '這是魔術師牌的正位。代表創造力、意志力與顯化。';
    revText = '這是魔術師牌的逆位。代表潛能未發揮、意志薄弱。';
  } else if (c.id === 'the-high-priestess') {
    upText = '這是女祭司牌的正位。代表直覺、潛意識與內在智慧。';
    revText = '這是女祭司牌的逆位。代表忽視直覺、隱藏的秘密。';
  }

  tarotDataStr += \`    {
      id: "\${c.id}",
      name: "\${c.name}",
      number: "\${c.roman}",
      uprightImage: "\${uprightImage}",
      reversedImage: "\${reversedImage}",
      uprightText: "\${upText}",
      reversedText: "\${revText}"
    }\${idx === cards.length - 1 ? '' : ','}
\`;
});

tarotDataStr += \`  ]
};
\`;

fs.writeFileSync(path.join(__dirname, 'js', 'tarotData.js'), tarotDataStr, 'utf8');
console.log('Successfully generated missing SVGs and updated tarotData.js');
