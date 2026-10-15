import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
// Explicit local inputs supplied by the user. Originals are kept untouched.
const inputs = [
  ['C:/Users/User/Downloads/深海微光中的擁抱.png','surface'],
  ['C:/Users/User/Downloads/9461a9de-7ec1-42d0-aab0-e62e1338aef5.png','underwater'],
];
await mkdir('public/art',{recursive:true});
for (const [input,name] of inputs) {
  await sharp(input).webp({quality:93,effort:6}).toFile(`public/art/${name}.webp`);
}
const og = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#f7f2e9"/><circle cx="1030" cy="200" r="310" fill="#e5c1c5"/><circle cx="1030" cy="200" r="333" fill="none" stroke="#bf7e8a"/><path d="M0 500h380l24-30 25 30h35l24-67 35 120 35-78 24 25h618" fill="none" stroke="#bd4356" stroke-width="3"/><g fill="#29232b" font-family="Microsoft JhengHei,serif"><text x="70" y="90" font-family="Arial" font-size="16" letter-spacing="6">A LOVE LETTER TO SEASON 1</text><text x="65" y="255" font-size="90" font-weight="bold">少女怪獸</text><text x="65" y="365" font-size="90" font-weight="bold" fill="#bd4356">焦糖戀心</text><text x="70" y="425" font-size="24" letter-spacing="6">第一季，完結紀念。</text><text x="70" y="580" font-family="Arial" font-size="13" letter-spacing="4">KAIJU GIRL CARAMELISE · FAN-MADE / UNOFFICIAL</text></g></svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og.png');
console.log('已從使用者原圖產生 WebP，未修改原始圖片；另產生文字 OG 圖。');
