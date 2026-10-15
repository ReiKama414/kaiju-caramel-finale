import { access, readFile } from 'node:fs/promises';
const required = ['public/art/surface.webp','public/art/underwater.webp','public/art/daichi.webp','public/art/moa.webp','public/og.png','public/icon.svg'];
for (const file of required) { await access(file); }
const rights = JSON.parse(await readFile('src/lib/asset-rights.json', 'utf8'));
if (process.argv.includes('--public') && rights.personalImages.publicRedistributionConfirmed !== true) {
  console.error('公開部署檢查未通過：使用者提供的圖片尚未確認公開重新發布權利；請取得確認後更新 src/lib/asset-rights.json，或替換為有公開使用權的素材；一般 build 可產生本機審閱版本；');
  process.exit(1);
}
console.log('素材完整性檢查通過；' + (process.argv.includes('--public') ? ' 公開使用狀態已確認；' : ' 個人提供圖片僅供本機審閱，公開前需完成權利確認；'));
