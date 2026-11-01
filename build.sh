#!/usr/bin/env bash
# 把 artifact 用的頁面片段 index.html 包成完整的 HTML 文件，輸出到 docs/ 給 GitHub Pages
# （artifact 發布時平台會自動補 doctype/head/重置樣式；獨立網站要自己補）
set -euo pipefail
cd "$(dirname "$0")"

SITE="https://pekka1117.github.io/riven-splice/"
mkdir -p docs

{
cat <<EOF
<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Warframe 紫卡拼接計算機：輸入紫卡上兩條屬性的數字，直接算出拼接後的數值，或反查要洗到多少才能達到目標值。">
<meta property="og:type" content="website">
<meta property="og:title" content="紫卡拼接計算機">
<meta property="og:description" content="輸入紫卡上兩條屬性的數字，直接算出拼接後的數值，或反查要洗到多少才能達到目標值。">
<meta property="og:url" content="${SITE}">
<meta property="og:image" content="${SITE}preview.png">
<meta name="twitter:card" content="summary_large_image">
<style>
:root { padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
body { margin: 0; }
img { max-width: 100%; }
[hidden] { display: none !important; }
</style>
</head>
<body>
EOF
cat index.html
cat <<EOF
</body>
</html>
EOF
} > docs/index.html

# 預覽圖：用拼接區的截圖
cp post/3-splice.png docs/preview.png
echo "docs/index.html: $(wc -c < docs/index.html) bytes"
