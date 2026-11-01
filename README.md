# 紫卡拼接計算機 · Riven Splice Calculator

https://pekka1117.github.io/riven-splice/

Warframe 拼接器（Riven Splicer）的計算工具。輸入紫卡上兩條屬性的數字，直接算出拼接後的數值；設定目標值，則會列出兩條屬性各要洗到多少。

A calculator for Warframe's Riven Splicer. Enter the two traits on your riven to get the spliced value, or set a target to see how high each trait needs to roll.

![拼接區截圖](docs/preview.png)

## 規則

- 拼接不會重新擲值：拼接屬性沿用兩條被消耗屬性中擲值較好的那一條，再套上自己的基礎係數。
- 負面屬性的數字越大代表擲值越高，拼出來反而越好。
- 公式照 [wiki Riven Mods](https://wiki.warframe.com/w/Riven_Mods#Spliced_Values)：`v = b × 10 × (rank + 1) × 1.2 × L × W`，以 32 位元浮點逐步計算。傾向自 44.1.3 起固定為 1.2×。
- 一般屬性係數與各紫卡類型可出現的屬性取自 DE 公開匯出資料（經由 [browse.wf](https://browse.wf/rivencalc)）。

## 開發

單一檔案、無相依套件。`index.html` 是頁面本體，`./build.sh` 會把它包成完整文件輸出到 `docs/`（GitHub Pages 從 `main` 分支的 `/docs` 發布）。
