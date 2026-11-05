// 進入點：還原狀態、首次繪製、綁定事件
import { compute, currentRecipe, setExampleValues } from "./calc";
import { $, closest } from "./dom";
import { restoreLang, setLang, type Lang } from "./i18n";
import { bindNomo } from "./nomo";
import { renderRanges, renderRolls } from "./ranges";
import { applyI18n, render, renderLegend, showTab } from "./render";
import { load, save, state, type Role, type Tab } from "./state";
import { setTheme, showTheme, type Theme } from "./theme";

function selectRecipe(id: string): void {
  if (id === state.recipe) return;
  state.recipe = id;
  state.roles = ["buff", "buff"];
  state.target = "";
  setExampleValues(currentRecipe());
  state.example = true;
  render();
}
function init(): void {
  const had = load();
  restoreLang();
  if (!had) setExampleValues(currentRecipe());
  if (location.hash === "#ranges") state.tab = "ranges";
  applyI18n();
  renderLegend();
  render();

  $("lang-en").onclick = $("lang-zh").onclick = (e) => {
    setLang((e.currentTarget as HTMLElement).dataset.lang as Lang);
    applyI18n(); renderLegend(); render();
  };
  document.addEventListener("click", (e) => {
    const b = closest(e, ".clr"); if (!b) return;
    const inp = $<HTMLInputElement>(b.dataset.for!);
    inp.value = "";
    inp.dispatchEvent(new Event("input", { bubbles: true }));
    inp.focus();
  });
  $("theme-group").addEventListener("click", (e) => {
    const b = closest(e, "button"); if (b) setTheme(b.dataset.themeSet as Theme);
  });
  // 宿主（例如 artifact 檢視器）改了 data-theme 時，按鈕狀態跟著更新
  new MutationObserver(showTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const rtype = $<HTMLSelectElement>("rtype"), lvl = $<HTMLSelectElement>("lvl");
  rtype.onchange = () => { state.type = +rtype.value; render(); };
  const tabs = document.querySelector<HTMLElement>(".tabs")!;
  tabs.addEventListener("click", (e) => {
    const b = closest(e, ".tab"); if (!b) return;
    state.tab = b.dataset.tab as Tab; showTab(); save();
  });
  // 置頂勾選：重繪後把焦點放回同一個方塊，鍵盤操作才不會跳走
  $("ranges").addEventListener("change", (e) => {
    const box = closest<HTMLInputElement>(e, ".pinbox"); if (!box) return;
    const k = box.dataset.k!;
    state.pins = box.checked ? [...state.pins.filter((x) => x !== k), k] : state.pins.filter((x) => x !== k);
    renderRanges(compute()); save();
    $("ranges").querySelector<HTMLElement>(`.pinbox[data-k="${k}"]`)?.focus();
  });
  $("ranges").addEventListener("input", (e) => {
    const inp = closest<HTMLInputElement>(e, ".rollin"); if (!inp) return;
    const k = inp.dataset.k!;
    if (inp.value) state.rolls[k] = inp.value; else delete state.rolls[k];
    renderRolls(); save();
  });
  // 屬性範圍表的拼接屬性連結：切回拼接計算並選好配方
  $("ranges").addEventListener("click", (e) => {
    if ((e.target as Element).id === "rolls-clear") { state.rolls = {}; renderRolls(); save(); return; }
    const b = closest(e, ".pick"); if (!b) return;
    state.tab = "splice";
    selectRecipe(b.dataset.r!);
    showTab(); save();
    $("groups").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });
  tabs.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    state.tab = state.tab === "splice" ? "ranges" : "splice"; showTab(); save();
    $(`tab-${state.tab}`).focus();
  });
  lvl.onchange = () => { state.lvl = +lvl.value; render(); };
  $("layout").addEventListener("click", (e) => {
    const b = closest(e, "button"); if (!b) return;
    state.buffs = +b.dataset.b!; state.curses = +b.dataset.c!; render();
  });
  $("groups").addEventListener("click", (e) => { const b = closest(e, ".chip"); if (b) selectRecipe(b.dataset.r!); });
  $("all").addEventListener("click", (e) => {
    const b = closest(e, ".pick"); if (!b) return;
    selectRecipe(b.dataset.r!);
    $("groups").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  });
  for (const i of [0, 1]) {
    $(`t${i}-role`).addEventListener("click", (e) => {
      const b = closest(e, "button"); if (!b || b.getAttribute("aria-disabled") === "true") return;
      const role = b.dataset.role as Role;
      state.roles[i] = role;
      if (role === "curse") state.roles[1 - i] = "buff";
      if (state.example) setExampleValues(currentRecipe());
      render();
    });
    const inp = $<HTMLInputElement>(`t${i}-val`);
    inp.addEventListener("input", () => { state.vals[i] = inp.value; state.example = false; render(); });
  }
  const target = $<HTMLInputElement>("target");
  target.addEventListener("input", () => { state.target = target.value; render(); });
  bindNomo();
}
init();
