// 介面文字。en 是型別基準，zh 少任何一個 key 都會編譯失敗
import type { Named } from "./data";

const en = {
  eyebrow: "Warframe · Riven Splicer",
  "theme-auto": "Auto", "theme-light": "Light", "theme-dark": "Dark", "theme-group": "Theme", clear: "Clear",
  title: "Riven Splice Calculator",
  "sis-kicker": "Also for Warframe", "sis-title": "Kuva This Week",
  "sis-desc": "Every weekly-capped Kuva vendor in one list. Tick off what you bought and see what is left before the Monday reset.",
  lede: "Since the Riven Splicer arrived, finding out what a splice will give has meant digging through old riven calculators or the wiki’s formula tables, and most old calculators still use the retired per-weapon disposition. This page does the math for you. Enter the two traits on your riven to see the spliced value, or set a target to see how high each trait needs to roll. A splice never rerolls: it keeps the better roll of the two traits it consumes.",
  "h-riven": "Your Riven", "h-riven-sub": "Kitguns use the Pistol table, Zaws the Melee table.",
  rtype: "Riven type", rank: "Rank", layout: "Buffs + curses",
  "disp-hint": "Disposition is fixed at ●●●●○ 1.2× since 44.1.3",
  "h-recipe": "Recipe", "recipes-n": (n: number, m: number, type: string) => `${n} recipes on ${type} rivens` + (m ? ` · ${m} not possible` : ""),
  "h-calc": "Splice", "h-calc-sub": "Type the number shown on your riven. The sign doesn’t matter.",
  buff: "Buff", curse: "Curse",
  "range-buff": (a: string, b: string) => `Possible as buff: ${a} to ${b}`,
  "range-curse": (a: string, b: string) => `Possible as curse: ${a} to ${b}`,
  "why-pos": "This trait only rolls as a buff.", "why-slot": "This layout has no curse slot.", "why-one": "The other trait is already the curse.",
  "roll-empty": "Enter a value to read its roll.",
  "roll-buff": (w: string) => `Roll ×${w}`,
  "roll-curse": (w: string) => `Roll ×${w}. On a curse a bigger number is a higher roll, and the splice uses that roll.`,
  "roll-err": (lo: string, hi: string) => `Out of range for this riven (${lo} to ${hi}). Check the riven type, rank and buff/curse count.`,
  "roll-bad": "Not a number.",
  "win": "Higher roll, carried into the splice.",
  "out-empty": "Enter at least one trait value.",
  "out-why-both": (n: string, w: string) => `Takes ${n}’s roll ×${w}.`,
  "out-why-one": (n: string, w: string) => `At least this, from ${n}’s roll ×${w}. Enter the other trait too: a higher roll there wins.`,
  "out-span": (a: string, b: string) => `Rounding of the shown values allows ${a} to ${b}.`,
  "out-range": (a: string, b: string) => `Spliced range on this riven: ${a} to ${b}`,
  "h-map": "Roll map", "h-map-sub": "All three scales line up by roll, ticked at the 0th, 25th, 50th, 75th and 100th percentile, so the ends are the min and max. Hover or tap to read across.",
  target: "Target spliced value",
  "target-out": (p: string, a: string, q: string, b: string) => `Needs <span class="c1">${p}</span> at <b>${a}</b> or beyond, or <span class="c2">${q}</span> at <b>${b}</b> or beyond.`,
  "target-any": (m: string) => `Every roll reaches it. The lowest possible splice is <b>${m}</b>.`,
  "target-no": (m: string) => `Not reachable on this riven. The best possible splice is <b>${m}</b>. More rank or a 2 buff + 1 curse layout raises it.`,
  "target-bad": "Enter a number.",
  "lg-roll": "Roll multiplier ×0.90 to ×1.10",
  "lg-cur": "Your splice", "lg-in": "Your traits",
  "nomo-desc": "Three aligned scales showing trait 1, trait 2 and the spliced value for each roll from ×0.90 to ×1.10.",
  "h-reach": "Reach table", "h-reach-sub": "Same roll, three numbers. Read a row across.",
  roll: "Roll", pct: "Roll percentile",
  "reach-note": "On a curse a bigger number is a higher roll, so the harshest curse gives the best splice.",
  "h-all": "All recipes on this riven", "h-all-sub": "Ranges with both inputs as buffs, at the rank and layout above.",
  spliced: "Spliced", from: "From", "na-pool": (n: string) => `${n} can’t roll on this riven type`, "na-class": "Not offered for this weapon class",
  g_elem: "Elements", g_fac: "Faction", g_gen: "General", g_ranged: "Ranged", g_melee: "Melee",
  "tab-splice": "Splice", "tab-ranges": "Trait ranges",
  "h-ranges": "Trait ranges",
  "ranges-sub": (type: string, k: string) => `Every trait a ${type} riven can roll, at rank and layout above (${k}).`,
  pin: "Pin", "pin-label": (n: string) => `Pin ${n} to the top`,
  "roll-val": "Your value", "roll-val-label": (n: string) => `Value of ${n} on your riven`,
  "roll-oor": "Out of range", "roll-lock": "Lock this", "roll-tie": "Tied",
  attr: "Trait", "buff-r": "As buff", "curse-r": "As curse", "splice-to": "Splices into", "b-col": "Base b",
  "no-curse": "No curse slot",
  "ranges-note": `<p>Ranges run from roll ×0.90 to ×1.10. Heat, Cold, Toxin, Electricity, Melee Damage, Punch Through, Initial Combo and Additional Combo Count Chance only roll as buffs; Chance to Gain Combo Count only rolls as a curse.</p><p>Elemental, physical and faction traits with the same value share one row. Ranged Puncture is a hair lower than Impact and Slash (b 0.01333 vs 0.013333), so the physical row shows the widest range of the three. Physical traits usually need the weapon to have more than 25% of that damage type.</p><p>Highlighted rows are the recipe picked on the Splice tab. Tick the box on the left to pin a row to the top; pins are remembered.</p><p>Rolled two good traits that don’t splice together? Type each number in Your value to read its roll percentile. The value alone tells a buff from a curse, using the rank and layout above. With two or more filled in, the highest roll is marked as the one to lock, since a splice keeps the better roll. On a curse a bigger number is a higher roll.</p>`,
  foot: `<p><b>Formula.</b> <code>v = b × 10 × (rank + 1) × D × L × W</code>, computed step by step in 32-bit floats. D = 1.2 for every weapon since disposition was retired in 44.1.3. L is <span class="nw">0.99 / 1.2375 / 0.75 / 0.9375</span> for a buff on a <span class="nw">2+0 / 2+1 / 3+0 / 3+1</span> riven, and <span class="nw">−0.495 / −0.75</span> for the curse on <span class="nw">2+1 / 3+1</span>. <span class="nw">W = 0.9 + 0.2u</span> runs from 0.90 to 1.10. A spliced trait takes the larger W of the two consumed traits and uses the buff L with its own <code>b</code>. The buff/curse layout never changes when you splice.</p>
<p><b>Rounding.</b> The game rounds what it shows, so a typed value maps to a narrow band of rolls. When that band changes the spliced number, the card shows the band. The game also computes in 32-bit floats; expect the last digit to differ now and then.</p>
<p><b>Sources.</b> Formula, recipes, trait coefficients and trait pools from the <a href="https://wiki.warframe.com/w/Riven_Mods#Overview_Table" target="_blank" rel="noopener">Warframe wiki</a>. Vintage companion traits and per-weapon physical damage limits are not modelled.</p>`,
};
type Dict = typeof en;
export type Key = keyof Dict;
type Args<K extends Key> = Dict[K] extends (...args: infer A) => string ? A : [];

const zh: Dict = {
  eyebrow: "Warframe · 紫卡拼接器",
  "theme-auto": "自動", "theme-light": "淺色", "theme-dark": "深色", "theme-group": "主題", clear: "清除",
  title: "紫卡拼接計算機",
  "sis-kicker": "另一個 Warframe 小工具", "sis-title": "本週赤毒",
  "sis-desc": "每週限購的赤毒來源一覽，勾掉買過的，看週一重置前還剩哪些沒領。",
  lede: "拼接器推出後，想知道一張紫卡拼下去會變幾 %，往往得翻舊的紫卡計算機或 wiki 的公式表自己算，而舊計算機多半還在用已經退役的武器傾向。這頁直接幫你算好：輸入紫卡上兩條屬性的數字，就能看到拼接後的數值；設定想要的目標值，則會列出兩條屬性各要洗到多少。拼接不會重新擲值，而是沿用兩條屬性中擲值較好的那一條。",
  "h-riven": "你的紫卡", "h-riven-sub": "組合槍套手槍係數，Zaw 套近戰係數。",
  rtype: "紫卡類型", rank: "等級", layout: "正面＋負面",
  "disp-hint": "44.1.3 起傾向固定為 ●●●●○ 1.2×",
  "h-recipe": "配方", "recipes-n": (n, m, type) => `${type}紫卡可用 ${n} 條配方` + (m ? `・${m} 條不可能` : ""),
  "h-calc": "拼接", "h-calc-sub": "照紫卡上顯示的數字輸入，正負號不影響。",
  buff: "正面", curse: "負面",
  "range-buff": (a, b) => `正面可能範圍：${a} 到 ${b}`,
  "range-curse": (a, b) => `負面可能範圍：${a} 到 ${b}`,
  "why-pos": "這條屬性只會是正面。", "why-slot": "這個配置沒有負面槽。", "why-one": "另一條已經是負面。",
  "roll-empty": "輸入數值即可讀出擲值。",
  "roll-buff": (w) => `擲值 ×${w}`,
  "roll-curse": (w) => `擲值 ×${w}。負面屬性數字越大代表擲值越高，拼接用的就是這個擲值。`,
  "roll-err": (lo, hi) => `超出這張紫卡的範圍（${lo} 到 ${hi}）。請檢查紫卡類型、等級與正負面條數。`,
  "roll-bad": "不是數字。",
  "win": "擲值較高，拼接沿用這條。",
  "out-empty": "請至少輸入一條屬性的數值。",
  "out-why-both": (n, w) => `沿用「${n}」的擲值 ×${w}。`,
  "out-why-one": (n, w) => `至少這麼多，來自「${n}」的擲值 ×${w}。另一條也輸入吧：它擲值較高就以它為準。`,
  "out-span": (a, b) => `顯示值有四捨五入，實際可能是 ${a} 到 ${b}。`,
  "out-range": (a, b) => `這張紫卡的拼接範圍：${a} 到 ${b}`,
  "h-map": "擲值對照圖", "h-map-sub": "三條刻度依擲值對齊，刻度標在第 0、25、50、75、100 百分位，兩端就是最小和最大值。滑過或點按即可讀值。",
  target: "目標拼接值",
  "target-out": (p, a, q, b) => `需要「<span class="c1">${p}</span>」達到 <b>${a}</b> 以上，或「<span class="c2">${q}</span>」達到 <b>${b}</b> 以上（以絕對值計）。`,
  "target-any": (m) => `任何擲值都達得到。最低拼接值是 <b>${m}</b>。`,
  "target-no": (m) => `這張紫卡達不到。最高拼接值是 <b>${m}</b>。提高等級或改成 2 正 1 負才能拉高。`,
  "target-bad": "請輸入數字。",
  "lg-roll": "擲值倍率 ×0.90 到 ×1.10",
  "lg-cur": "你的拼接", "lg-in": "你的屬性",
  "nomo-desc": "三條對齊的刻度，顯示擲值 ×0.90 到 ×1.10 時屬性一、屬性二與拼接後的數值。",
  "h-reach": "對照表", "h-reach-sub": "同一個擲值對應的三個數字，橫著讀。",
  roll: "擲值", pct: "擲值百分位",
  "reach-note": "負面屬性數字越大代表擲值越高，所以最重的負面反而拼得最好。",
  "h-all": "這張紫卡的所有配方", "h-all-sub": "兩條輸入都當正面計算，套用上方的等級與條數。",
  spliced: "拼接", from: "來源", "na-pool": (n) => `這種紫卡不會出現「${n}」`, "na-class": "這個武器類別沒有這條配方",
  g_elem: "元素", g_fac: "派系", g_gen: "通用", g_ranged: "遠程", g_melee: "近戰",
  "tab-splice": "拼接計算", "tab-ranges": "屬性範圍",
  "h-ranges": "屬性範圍",
  "ranges-sub": (type, k) => `${type}紫卡可能出現的所有屬性，套用上方的等級與條數（${k}）。`,
  pin: "置頂", "pin-label": (n) => `把「${n}」置頂`,
  "roll-val": "你的數值", "roll-val-label": (n) => `紫卡上「${n}」的數值`,
  "roll-oor": "超出範圍", "roll-lock": "鎖這條", "roll-tie": "同分",
  attr: "屬性", "buff-r": "正面範圍", "curse-r": "負面範圍", "splice-to": "可拼接成", "b-col": "基礎係數 b",
  "no-curse": "沒有負面槽",
  "ranges-note": `<p>範圍是擲值 ×0.90 到 ×1.10。火焰、冰凍、毒素、電擊、近戰傷害、穿透、起始連擊數、額外連擊數機率只會是正面；機率獲得連擊數只會是負面。</p><p>數值相同的元素、物理、派系傷害各併成一列。遠程的穿刺係數比衝擊、切割略低（b 0.01333 對 0.013333），所以物理那列的範圍取三者最寬。物理傷害通常要武器該傷害類型超過 25% 才洗得出來。</p><p>標色的列是「拼接計算」分頁目前選的配方。勾選左側方塊可把該列置頂，會記住。</p><p>洗出兩條好屬性、但兩條拼不起來時，在「你的數值」輸入紫卡上的數字就能看擲值百分位。會依上方的等級與條數，從數值自動判斷是正面還是負面。填了兩條以上時，擲值最高的那條會標出來當鎖定建議，因為拼接保留的是較好的擲值。負面屬性的數字越大代表擲值越高。</p>`,
  foot: `<p><b>公式。</b><code>v = b × 10 × (等級 + 1) × D × L × W</code>，以 32 位元浮點逐步計算。傾向在 44.1.3 退役後，所有武器 D = 1.2。正面的 L 在 <span class="nw">2+0 / 2+1 / 3+0 / 3+1</span> 時為 <span class="nw">0.99 / 1.2375 / 0.75 / 0.9375</span>，負面在 <span class="nw">2+1 / 3+1</span> 時為 <span class="nw">−0.495 / −0.75</span>。<span class="nw">W = 0.9 + 0.2u</span>，介於 0.90 與 1.10。拼接屬性取兩條被消耗屬性中較大的 W，以自己的 <code>b</code> 套正面的 L。拼接不會改變正負面配置。</p>
<p><b>四捨五入。</b>遊戲顯示的數值有四捨五入，所以輸入值對應的是一小段擲值；這段範圍若會影響拼接結果，卡片會標出來。遊戲用 32 位元浮點運算，最後一位偶爾會差一點。</p>
<p><b>來源。</b>公式、配方、屬性係數與各類型可出現的屬性皆取自 <a href="https://wiki.warframe.com/w/Riven_Mods#Overview_Table" target="_blank" rel="noopener">Warframe wiki</a>。未處理同伴紫卡的舊版屬性，以及個別武器的物理傷害限制。</p>`,
};

export type Lang = "en" | "zh";
const I18N: Record<Lang, Dict> = { en, zh };
const LANG_KEY = "riven-splice-lang";

export let lang: Lang = "zh";  // 預設正體中文；只有使用者按過語言鈕才記住

export function restoreLang(): void {
  try { const l = localStorage.getItem(LANG_KEY); if (l === "en" || l === "zh") lang = l; } catch { /* 忽略 */ }
}
export function setLang(l: Lang): void {
  lang = l;
  try { localStorage.setItem(LANG_KEY, lang); } catch { /* 忽略 */ }
}
export function tr<K extends Key>(key: K, ...args: Args<K>): string {
  const v = I18N[lang][key] as string | ((...a: Args<K>) => string);
  return typeof v === "function" ? v(...args) : v;
}
export const nm = (o: Named): string => o[lang];
