# 少女怪獸焦糖戀心

非官方第一季完結紀念網站。

Next.js App Router · TypeScript strict · Tailwind CSS · GSAP ScrollTrigger / Flip · 無後端

- 網站：https://reikama414.github.io/kaiju-caramel-finale/
- 作者：[ReiKama414](https://reikama414.vercel.app/)
- GitHub：https://github.com/ReiKama414/kaiju-caramel-finale
- 授權：[MIT License](./LICENSE)

## 執行

```sh
npm ci
npm run dev
```

預覽：http://localhost:3000

- 支援滾輪、觸控上下滑動、方向鍵、Page Up / Down、Home / End 與章節導覽
- 角色圖鑑為釘選捲動，向下滾動會依序自動切換 11 位角色；快速選單可使用左右方向鍵
- 右上角可切換中文／日文，選擇會記在瀏覽器

```sh
npm run typecheck
npm run lint
npm run check:assets
npm run build
```

- `out/` 是完整靜態審閱版本，可由靜態 HTTP server 提供
- 公開環境請於建置時設定 `NEXT_PUBLIC_SITE_URL` 為實際網址，以產生正確的 OG 圖片網址

## 公開部署

兩張擁抱圖片與兩張角色劇照由使用者提供，公開重新發布權尚未確認。

- `npm run build:public` 會先檢查 `src/lib/asset-rights.json`，未確認權利時會中止
- 取得確認後才更新該狀態，或替換成可公開使用的素材，再執行此指令，將 `out/` 部署至靜態主機
- 一般 `build` 產物僅供本機審閱，不代表已取得素材授權

### 素材與內容

- 官方角色圖片只從官方原始網域載入，不納入靜態輸出
- 遠端不可用時會顯示來源提示，並保留官方角色頁連結
- 沒有使用重繪角色圖
- 最愛與大地採使用者提供的原畫風劇照，保留完整畫面；大地為合照左側紅髮男孩
- 角色資料、核實狀態與來源在 `src/lib/content.ts`，網站內亦可查看
- 系統的低動態偏好會停用釘選捲動及主要動畫，兩張結尾圖片改為依序靜態呈現
- 回憶章節收錄全 12 集共 72 張官方原站劇照，可逐集切換並放大檢視；結尾提供觀看與原作連結

## 授權

本專案程式碼以 [MIT](./LICENSE) 授權，Copyright © 2026 [ReiKama414](https://reikama414.vercel.app/)。

MIT 僅涵蓋本專案自行撰寫的程式碼、版面與原創圖形。  
作品名稱、角色、官方視覺與劇照之權利歸原權利人所有。  
本網站為粉絲自發企劃，與原作者、出版社、動畫製作委員會無官方合作。
