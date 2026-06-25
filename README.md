# 荷蘭 × 匈牙利 行程 App

2026.06.27 – 07.08 旅遊行程與導航小工具。單頁網站，可加到 iPhone 主畫面當 App 用，支援離線開啟。

## 檔案
| 檔案 | 用途 |
|---|---|
| `index.html` | 主程式（行程、地點、換匯、用語、航班全在裡面） |
| `manifest.json` | 讓它能「加入主畫面」變成獨立 App |
| `sw.js` | 離線快取，沒網路也能開內容 |
| `icon-180/192/512.png` | App 圖示 |

## 放上 GitHub Pages

1. 在 GitHub 新建一個 repo（例如 `trip`），把這 6 個檔案全部上傳到根目錄。
2. 進 repo → **Settings → Pages**。
3. Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾 `/ (root)`，按 Save。
4. 等一兩分鐘，網址會是 `https://<你的帳號>.github.io/trip/`。

## 加到 iPhone 主畫面
1. 用 **Safari** 開上面的網址。
2. 點下方分享鈕 → **加入主畫面**。
3. 主畫面就會出現圖示，點開是全螢幕、可離線。

## 之後要改行程
所有資料都在 `index.html` 裡的 `DAYS`、`PLACES`、`HOTELS` 等變數，直接改文字再重新上傳即可。
改完記得把 `sw.js` 裡的 `CACHE = 'nl-hu-trip-v1'` 數字 +1，手機才會抓到新版。
