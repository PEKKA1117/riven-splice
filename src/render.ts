// 主畫面繪製：設定列、配方、拼接卡片、目標值、對照表與分頁
import {
  compute, currentRecipe, fixRoles, fmt, halfStep, layoutKey, baseOf, buffScale, parseMag, recipeBlock, recipeTags,
  setExampleValues, splicedScale, val, wOf, type Calc, type Trait,
} from "./calc";
import { GROUPS, LAYOUTS, L_BUFF, L_CURSE, RECIPES, REACH_W, RIVEN_TYPES, SPLICED, TRAITS, type TraitTag } from "./data";
import { $ } from "./dom";
import { lang, nm, tr, type Key } from "./i18n";
import { renderNomo } from "./nomo";
import { renderRanges } from "./ranges";
import { save, state } from "./state";
import { showTheme } from "./theme";

export function applyI18n(): void {
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll<HTMLElement>("[data-t]").forEach((n) => { n.innerHTML = tr(n.dataset.t as Key); });
  $("foot").innerHTML = tr("foot");
  $("nomo-desc").textContent = tr("nomo-desc");
  for (const b of document.querySelectorAll<HTMLElement>(".lang button")) b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  $("theme-group").setAttribute("aria-label", tr("theme-group"));
  for (const b of document.querySelectorAll<HTMLElement>(".clr")) { b.setAttribute("aria-label", tr("clear")); b.title = tr("clear"); }
  showTheme();
  $("rtype").innerHTML = RIVEN_TYPES.map((t, i) => `<option value="${i}">${nm(t)}</option>`).join("");
  $("lvl").innerHTML = Array.from({ length: 9 }, (_, i) => `<option value="${i}">${i}</option>`).join("");
}

function renderSetup(): void {
  $<HTMLSelectElement>("rtype").value = String(state.type);
  $<HTMLSelectElement>("lvl").value = String(state.lvl);
  $("layout").innerHTML = LAYOUTS.map(([b, c]) =>
    `<button type="button" data-b="${b}" data-c="${c}" aria-pressed="${state.buffs === b && state.curses === c}">${b}+${c}</button>`).join("");
  const k = layoutKey(state);
  $("layout-hint").textContent = `L ${lang === "zh" ? "正面" : "buff"} ${L_BUFF[k]}` + (L_CURSE[k] ? ` · ${lang === "zh" ? "負面" : "curse"} ${L_CURSE[k]}` : "");
}

function renderChips(): void {
  const t = state.type;
  let ok = 0, bad = 0;
  const html = GROUPS.map((g) => {
    const chips = RECIPES.filter((r) => r.g === g && !recipeBlock(r, t)).map((r) => {
      const [a, b] = recipeTags(r, t);
      return `<button type="button" class="chip" data-r="${r.id}" aria-pressed="${r.id === state.recipe}"><b>${nm(SPLICED[r.out])}</b><span>${nm(TRAITS[a])} + ${nm(TRAITS[b])}</span></button>`;
    });
    ok += chips.length;
    bad += RECIPES.filter((r) => r.g === g && recipeBlock(r, t)).length;
    return chips.length ? `<div class="group"><div class="lbl">${tr(`g_${g}`)}</div><div class="chips">${chips.join("")}</div></div>` : "";
  }).join("");
  $("groups").innerHTML = html;
  $("recipe-count").textContent = tr("recipes-n", ok, bad, nm(RIVEN_TYPES[t]));
}

function renderCalc(c: Calc): void {
  c.traits.forEach((x, i) => {
    $(`t${i}-name`).textContent = nm(TRAITS[x.tag]);
    // 負面不能選時寫出原因：只會是正面 > 沒有負面槽 > 另一條已是負面
    const why = TRAITS[x.tag].pos ? "why-pos" : state.curses === 0 ? "why-slot" : c.traits[1 - i].role === "curse" ? "why-one" : null;
    const canCurse = !why;
    $(`t${i}-role`).innerHTML = (["buff", "curse"] as const).map((role) =>
      `<button type="button" data-i="${i}" data-role="${role}" aria-pressed="${x.role === role}"${role === "curse" && !canCurse ? ` aria-disabled="true" title="${tr(why)}"` : ""}>${tr(role)}</button>`).join("");
    const inp = $<HTMLInputElement>(`t${i}-val`);
    if (document.activeElement !== inp) inp.value = state.vals[i];
    inp.placeholder = x.unit === "x" ? (x.role === "curse" ? "0.88" : "1.12") : "";
    $(`t${i}-unit`).textContent = x.unit === "x" ? "×" : x.unit;
    inp.parentElement!.classList.toggle("pre", x.unit === "x");
    inp.parentElement!.querySelector<HTMLElement>(".clr")!.hidden = !state.vals[i];
    const lo = fmt(x.unit, val(x.sc, 0.9), true), hi = fmt(x.unit, val(x.sc, 1.1), true);
    $(`t${i}-range`).textContent = tr(x.role === "curse" ? "range-curse" : "range-buff", lo, hi);
    if (why) $(`t${i}-range`).insertAdjacentHTML("beforeend", `<span class="why">${tr(why)}</span>`);
    const box = $(`t${i}-roll`), rd = x.read;
    box.className = "roll";
    if (rd.kind === "empty") box.textContent = tr("roll-empty");
    else if (rd.kind === "bad") { box.className = "roll err"; box.textContent = tr("roll-bad"); }
    else if (rd.kind === "out") { box.className = "roll err"; box.textContent = tr("roll-err", lo, hi); }
    else {
      const w = wOf(rd.u).toFixed(3);
      box.innerHTML = (x.role === "curse" ? tr("roll-curse", w) : tr("roll-buff", w))
        + (c.both && c.win === i ? `<br><b>${tr("win")}</b>` : "");
      if (c.both && c.win === i) box.className = "roll win";
    }
  });
  $("out-name").textContent = nm(SPLICED[c.r.out]) + (lang === "zh" ? "（拼接）" : " (spliced)");
  const u = c.outUnit;
  if (!c.roll) {
    $("out-big").innerHTML = `<small>—</small>`;
    $("out-why").textContent = tr("out-empty");
  } else {
    $("out-big").textContent = fmt(u, val(c.outSc, wOf(c.roll.u)), true);
    const n = nm(TRAITS[c.traits[c.win].tag]), w = wOf(c.roll.u).toFixed(3);
    let why = c.both ? tr("out-why-both", n, w) : tr("out-why-one", n, w);
    const a = fmt(u, val(c.outSc, wOf(c.roll.lo)), true), b = fmt(u, val(c.outSc, wOf(c.roll.hi)), true);
    if (a !== b) why += " " + tr("out-span", a, b);
    $("out-why").textContent = why;
  }
  $("out-range").textContent = tr("out-range", fmt(u, val(c.outSc, 0.9), true), fmt(u, val(c.outSc, 1.1), true));
}

function renderTarget(c: Calc): number | null {
  const out = $("target-out"), u = c.outUnit;
  $("target-unit").textContent = u === "x" ? "×" : u;
  const inp = $<HTMLInputElement>("target");
  inp.parentElement!.classList.toggle("pre", u === "x");
  inp.parentElement!.querySelector<HTMLElement>(".clr")!.hidden = !state.target;
  if (document.activeElement !== inp) inp.value = state.target;
  inp.placeholder = fmt(u, c.outSc, false).replace(/[×%+]/g, "");
  const mag = parseMag(u, state.target);
  if (mag === null) { out.innerHTML = ""; return null; }
  if (Number.isNaN(mag)) { out.textContent = tr("target-bad"); return null; }
  const need = (mag / c.outSc - 0.9) / 0.2;
  if (need > 1) { out.innerHTML = tr("target-no", fmt(u, val(c.outSc, 1.1), true)); return null; }
  if (need <= 0) { out.innerHTML = tr("target-any", fmt(u, val(c.outSc, 0.9), true)); return 0; }
  const [x, y] = c.traits;
  out.innerHTML = tr("target-out", nm(TRAITS[x.tag]), fmtNeed(x, need), nm(TRAITS[y.tag]), fmtNeed(y, need));
  return need;
}
// 所需屬性值：往「更好」的方向進位到顯示精度，確保顯示值達到即可
function fmtNeed(x: Trait, u: number): string {
  const v = val(x.sc, wOf(u)), h = halfStep(x.unit) * 2;
  const m = Math.ceil(Math.abs(v) / h - 1e-9) * h;
  return fmt(x.unit, Math.sign(v) * m, true);
}

export function renderLegend(): void {
  $("legend").innerHTML = `<span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="var(--raised)" stroke="var(--ink2)" stroke-width="2"/></svg>${tr("lg-in")}</span>`
    + `<span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="var(--s3)"/></svg>${tr("lg-cur")}</span>`
    + `<span><svg width="22" height="14" aria-hidden="true"><line x1="1" x2="21" y1="7" y2="7" stroke="var(--ink3)" stroke-dasharray="4 3"/></svg>${tr("target")}</span>`;
}

function renderReach(c: Calc): void {
  const [x, y] = c.traits, u = c.outUnit;
  const at = c.roll && wOf(c.roll.u);
  const near = at != null ? REACH_W.reduce((best, w, i) => (Math.abs(w - at) < Math.abs(REACH_W[best] - at) ? i : best), 0) : -1;
  const head = `<thead><tr><th class="num">${tr("roll")}</th><th class="num c1">${nm(TRAITS[x.tag])} <span class="muted">(${tr(x.role)})</span></th><th class="num c2">${nm(TRAITS[y.tag])} <span class="muted">(${tr(y.role)})</span></th><th class="num c3">${nm(SPLICED[c.r.out])}</th></tr></thead>`;
  const body = REACH_W.map((w, i) => `<tr class="${i === near ? "hl" : ""}"><td class="num">×${w.toFixed(2)}</td><td class="num">${fmt(x.unit, val(x.sc, w), true)}</td><td class="num">${fmt(y.unit, val(y.sc, w), true)}</td><td class="num"><b>${fmt(u, val(c.outSc, w), true)}</b></td></tr>`).join("");
  $("reach").innerHTML = head + "<tbody>" + body + "</tbody>";
}

function renderAll(c: Calc): void {
  const s = state, t = s.type;
  const head = `<thead><tr><th>${tr("spliced")}</th><th>${tr("from")}</th><th class="num">${lang === "zh" ? "屬性一" : "Trait 1"}</th><th class="num">${lang === "zh" ? "屬性二" : "Trait 2"}</th><th class="num">${tr("spliced")}</th></tr></thead>`;
  const rows = RECIPES.map((r) => {
    const why = recipeBlock(r, t);
    const out = nm(SPLICED[r.out]);
    if (why) return { na: true, html: `<tr class="na"><td>${out}</td><td colspan="4">${why}</td></tr>` };
    const [a, b] = recipeTags(r, t);
    const ra = (tag: TraitTag) => { const sc = buffScale(baseOf(tag, t), s), un = TRAITS[tag].unit; return `${fmt(un, val(sc, 0.9), true)} – ${fmt(un, val(sc, 1.1), true)}`; };
    const osc = splicedScale(r.out, s), ou = SPLICED[r.out].unit;
    return { html: `<tr class="${r.id === c.r.id ? "sel" : ""}"><td><button type="button" class="pick" data-r="${r.id}">${out}</button></td><td>${nm(TRAITS[a])} + ${nm(TRAITS[b])}</td><td class="num">${ra(a)}</td><td class="num">${ra(b)}</td><td class="num"><b>${fmt(ou, val(osc, 0.9), true)} – ${fmt(ou, val(osc, 1.1), true)}</b></td></tr>` };
  });
  $("all").innerHTML = head + "<tbody>" + rows.filter((r) => !r.na).map((r) => r.html).join("") + rows.filter((r) => r.na).map((r) => r.html).join("") + "</tbody>";
}

export function showTab(): void {
  if (state.tab !== "ranges") state.tab = "splice";
  for (const b of document.querySelectorAll<HTMLElement>(".tab")) b.setAttribute("aria-selected", String(b.dataset.tab === state.tab));
  $("panel-splice").hidden = state.tab !== "splice";
  $("panel-ranges").hidden = state.tab !== "ranges";
}

export function render(): void {
  renderSetup();
  renderChips();
  const r = currentRecipe();
  fixRoles(recipeTags(r, state.type));
  if (state.example) setExampleValues(r);  // 範例值跟著設定變動，才不會超出範圍
  const c = compute();
  renderCalc(c);
  const need = renderTarget(c);
  renderNomo(c, need);
  renderReach(c);
  renderAll(c);
  renderRanges(c);
  showTab();
  save();
}
