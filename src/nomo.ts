// 擲值對照圖（SVG）
import { fmt, val, wOf, type Calc } from "./calc";
import { SPLICED, TRAITS, type Unit } from "./data";
import { $ } from "./dom";
import { nm, tr } from "./i18n";

interface Row { cls: number; y: number; sc: number; unit: Unit; name: string; sub: string }

const SVGNS = "http://www.w3.org/2000/svg";
function el(tag: string, attrs: Record<string, string | number>, text?: string): SVGElement {
  const n = document.createElementNS(SVGNS, tag);
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  if (text != null) n.textContent = text;
  return n;
}
const NOMO = { L: 168, R: 736, rows: [86, 146, 206] };
const PCTS = [0, 0.25, 0.5, 0.75, 1];  // 對照圖的百分位刻度；p0 = 最小（×0.90）、p100 = 最大（×1.10）
const xOf = (u: number): number => NOMO.L + (NOMO.R - NOMO.L) * u;
let lastRows: Row[] | null = null, ghostU: number | null = null;
export function renderNomo(c: Calc, need: number | null): void {
  const svg = $<SVGSVGElement>("nomo");
  [...svg.querySelectorAll(":scope > :not(desc)")].forEach((n) => n.remove());
  const rows: Row[] = [
    { cls: 1, y: NOMO.rows[0], sc: c.traits[0].sc, unit: c.traits[0].unit, name: nm(TRAITS[c.traits[0].tag]), sub: tr(c.traits[0].role) },
    { cls: 2, y: NOMO.rows[1], sc: c.traits[1].sc, unit: c.traits[1].unit, name: nm(TRAITS[c.traits[1].tag]), sub: tr(c.traits[1].role) },
    { cls: 3, y: NOMO.rows[2], sc: c.outSc, unit: c.outUnit, name: nm(SPLICED[c.r.out]), sub: tr("spliced") },
  ];
  // 頂端：擲值倍率軸
  // 擲值是均勻分布，第 p 百分位就是 u = p%；頂軸標百分位，下方附擲值倍率
  const yTop = 30;
  svg.appendChild(el("text", { x: 12, y: yTop + 4, class: "sub" }, tr("pct")));
  svg.appendChild(el("line", { x1: NOMO.L, x2: NOMO.R, y1: yTop, y2: yTop, class: "base" }));
  for (const u of PCTS) {
    const x = xOf(u);
    svg.appendChild(el("line", { x1: x, x2: x, y1: yTop - 4, y2: yTop + 4, class: "tick" }));
    svg.appendChild(el("text", { x, y: yTop - 9, "text-anchor": "middle" }, "p" + Math.round(u * 100)));
    svg.appendChild(el("text", { x, y: yTop + 17, "text-anchor": "middle", class: "sub" }, "×" + wOf(u).toFixed(3)));
    svg.appendChild(el("line", { x1: x, x2: x, y1: yTop + 22, y2: NOMO.rows[2] + 4, class: "grid" }));
  }
  // 游標線放在刻度文字之下，文字的描邊才蓋得住
  const under = el("g", {});
  svg.appendChild(under);
  for (const row of rows) {
    const { y } = row;
    svg.appendChild(el("text", { x: 12, y: y - 2, class: "lab" }, row.name.length > 22 ? row.name.slice(0, 21) + "…" : row.name));
    svg.appendChild(el("text", { x: 12, y: y + 13, class: "sub" }, row.sub));
    svg.appendChild(el("line", { x1: NOMO.L, x2: NOMO.R, y1: y, y2: y, class: `band band${row.cls}` }));
    // 刻度固定在 p0 / p25 / p50 / p75 / p100，標出該百分位的實際數值
    for (const u of PCTS) {
      const x = xOf(u);
      svg.appendChild(el("line", { x1: x, x2: x, y1: y - 5, y2: y + 5, class: "tick" }));
      svg.appendChild(el("text", { x, y: y + 19, "text-anchor": "middle" }, fmt(row.unit, val(row.sc, wOf(u)), true)));
    }
  }
  // 使用者輸入的兩條屬性與拼接結果
  c.traits.forEach((x, i) => {
    if (x.read.kind !== "ok") return;
    svg.appendChild(el("circle", { cx: xOf(x.read.u), cy: NOMO.rows[i], r: 5.5, class: `ring d${i + 1}` }));
  });
  if (c.roll) {
    const { u } = c.roll, x = xOf(u);
    under.appendChild(el("line", { x1: x, x2: x, y1: NOMO.rows[c.win], y2: NOMO.rows[2], class: "cur" }));
    svg.appendChild(el("circle", { cx: x, cy: NOMO.rows[2], r: 6, class: "d3" }));
    const lab = fmt(c.outUnit, val(c.outSc, wOf(u)), true);
    const anchor = u > 0.85 ? "end" : u < 0.15 ? "start" : "middle";
    svg.appendChild(el("text", { x, y: NOMO.rows[2] + 34, "text-anchor": anchor, class: "val" }, lab));
  }
  if (need != null && need > 0 && need <= 1) {
    const x = xOf(need);
    under.appendChild(el("line", { x1: x, x2: x, y1: NOMO.rows[0] - 10, y2: NOMO.rows[2] + 6, class: "ghost" }));
  }
  // 滑鼠/手指讀值
  const g = el("g", { id: "ghost" });
  svg.appendChild(g);
  svg.appendChild(el("rect", { x: NOMO.L - 10, y: 10, width: NOMO.R - NOMO.L + 20, height: 230, class: "hit" }));
  lastRows = rows;
  drawGhost();
}
function drawGhost(): void {
  const g = $<SVGGElement>("ghost");
  if (!g || !lastRows) return;
  g.replaceChildren();
  if (ghostU == null) return;
  const x = xOf(ghostU);
  g.appendChild(el("line", { x1: x, x2: x, y1: 26, y2: NOMO.rows[2] + 6, class: "ghost" }));
  g.appendChild(el("text", { x: x + (ghostU > 0.85 ? -8 : 8), y: 64, "text-anchor": ghostU > 0.85 ? "end" : "start", class: "gval" }, `p${Math.round(ghostU * 100)} · ×${wOf(ghostU).toFixed(3)}`));
  for (const row of lastRows) {
    g.appendChild(el("circle", { cx: x, cy: row.y, r: 4, class: `d${row.cls}` }));
    const t = el("text", { x: x + (ghostU > 0.85 ? -8 : 8), y: row.y - 9, "text-anchor": ghostU > 0.85 ? "end" : "start", class: "val" },
      fmt(row.unit, val(row.sc, wOf(ghostU)), true));
    g.appendChild(t);
  }
}
function nomoPointer(ev: PointerEvent): void {
  const r = $<SVGSVGElement>("nomo").getBoundingClientRect();
  const vx = ((ev.clientX - r.left) / r.width) * 760;
  ghostU = Math.min(1, Math.max(0, (vx - NOMO.L) / (NOMO.R - NOMO.L)));
  drawGhost();
}

export function bindNomo(): void {
  const svg = $<SVGSVGElement>("nomo");
  svg.addEventListener("pointermove", nomoPointer);
  svg.addEventListener("pointerdown", nomoPointer);
  // 觸控交給外層橫向捲動；點按的讀值線留著，滑鼠移出或觸控開始捲動才清掉
  const clearGhost = () => { ghostU = null; drawGhost(); };
  svg.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") clearGhost(); });
  svg.addEventListener("pointercancel", clearGhost);
}
