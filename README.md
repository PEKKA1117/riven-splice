# 紫卡拼接計算機 · Riven Splice Calculator

https://pekka1117.github.io/riven-splice/

Warframe 拼接器（Riven Splicer）的計算工具。輸入紫卡上兩條屬性的數字，直接算出拼接後的數值；設定目標值，則會列出兩條屬性各要洗到多少。「屬性範圍」分頁列出每種紫卡所有屬性的正面／負面範圍，以及各屬性能拼接成什麼；輸入紫卡上的數字可查擲值百分位，洗出兩條拼不起來的好屬性時用來決定鎖哪條。

A calculator for Warframe's Riven Splicer. Enter the two traits on your riven to get the spliced value, or set a target to see how high each trait needs to roll. The Trait ranges tab lists every trait's buff and curse range for each riven type, and what it splices into; type a value there to read its roll percentile and see which of two traits that don't splice together to lock.

![拼接區截圖](docs/preview.png)

## 規則

- 拼接不會重新擲值：拼接屬性沿用兩條被消耗屬性中擲值較好的那一條，再套上自己的基礎係數。
- 負面屬性的數字越大代表擲值越高，拼出來反而越好。
- 公式照 [wiki Riven Mods](https://wiki.warframe.com/w/Riven_Mods#Spliced_Values)：`v = b × 10 × (rank + 1) × 1.2 × L × W`，以 32 位元浮點逐步計算。傾向自 44.1.3 起固定為 1.2×。
- 一般屬性係數、各紫卡類型可出現的屬性與只會正面/負面的註記，同樣取自 [wiki Riven Mods](https://wiki.warframe.com/w/Riven_Mods#Overview_Table) 的表格；wiki 是唯一資料來源。

## 開發

執行時無相依套件；TypeScript 與 esbuild 只在建置時使用。

- `index.html`：頁面 markup，是沒有 doctype/head 的片段，不含內嵌 script 與 style
- `src/style.css`：樣式
- `src/main.ts`：進入點與事件；`render.ts`、`nomo.ts`、`ranges.ts` 負責畫面，`calc.ts` 是不碰 DOM 的計算，`data.ts` 是 wiki 資料，`i18n.ts` 是介面文字
- `src/theme-init.ts`：獨立打包的阻塞式腳本，在畫面繪製前套用主題，避免閃白

`./build.sh` 會先跑 `tsc` 型別檢查，再用 esbuild 打包，並把 `index.html` 包成完整文件，全部輸出到 `docs/`（GitHub Pages 從 `main` 分支的 `/docs` 發布）。第一次執行會自動 `npm ci`。

`index.html` 引用的 `main.js`、`theme-init.js`、`style.css` 只存在於 `docs/`，所以要開 `docs/index.html` 才看得到頁面。發布 artifact 時，這三個檔案要跟 `index.html` 一起帶上。

## 授權 · License

© 2026 PEKKA，以 [CC BY 4.0](LICENSE)（[摘要](https://creativecommons.org/licenses/by/4.0/deed.zh-hant)）授權。可以自由轉載、修改、商用，但散佈原版或改作時**必須**：

1. 標示作者 **PEKKA**，並附上原作連結（下方 repo 或網頁擇一，放在使用者看得到的地方，例如頁尾）；
2. 註明以 CC BY 4.0 授權並附授權連結；
3. 若有修改，註明已修改。

建議寫法：`基於 PEKKA 的 <a href="https://pekka1117.github.io/riven-splice/">riven-splice</a>（CC BY 4.0），已修改`

© 2026 PEKKA, licensed under [CC BY 4.0](LICENSE). You may share, adapt and use this commercially, but any redistribution or adaptation **must** credit **PEKKA** with a visible link to the original (the repo or the page below, e.g. in your footer), link the license, and say whether you changed it.

- https://github.com/PEKKA1117/riven-splice
- https://pekka1117.github.io/riven-splice/
