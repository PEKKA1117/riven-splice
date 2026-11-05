// 屬性範圍分頁
import { baseOf, buffScale, curseScale, fmt, isMelee, layoutKey, readAnyRole, recipeBlock, recipeTags, val, wOf, type Calc } from "./calc";
import { MERGE, RANGE_ORDER, RECIPES, RIVEN_TYPES, SPLICED, TRAITS, BASE, type SplicedId, type TraitTag } from "./data";
import { $ } from "./dom";
import { lang, nm, tr } from "./i18n";
import { state } from "./state";

// 部分屬性在遠程與近戰的名稱不同
function traitName(tag: TraitTag, t: number): string {
  if (tag === "WeaponFireRateMod" && !isMelee(t)) return lang === "zh" ? "射速（弓類加倍）" : "Fire Rate (x2 for Bows)";
  if (tag === "WeaponCritChanceMod" && isMelee(t)) return lang === "zh" ? "暴擊機率（重擊 x 2）" : "Critical Chance (x2 for Heavy Attacks)";
  return nm(TRAITS[tag]);
}
export function renderRanges(c: Calc): void {
  const s = state, t = s.type;
  const uses: Partial<Record<TraitTag, Map<SplicedId, string>>> = {};  // tag → Map(拼接屬性 → 用到這條屬性的配方 id)
  for (const r of RECIPES) {
    if (recipeBlock(r, t)) continue;
    for (const tag of recipeTags(r, t)) {
      const m = (uses[tag] ??= new Map());
      if (!m.has(r.out)) m.set(r.out, r.id);
    }
  }
  // 組列：同群組且 b 相同的屬性併成一列，key 用群組名，否則用 tag
  const present = RANGE_ORDER.filter((tag) => BASE[tag][t] != null);
  const items: { key: string; tag: TraitTag; tags: TraitTag[]; name: string }[] = [], done = new Set<TraitTag>();
  for (const tag of present) {
    if (done.has(tag)) continue;
    const g = MERGE.find((m) => tag in m.short);
    // 遠程的穿刺係數是 0.01333、衝擊與切割是 0.013333，差距 0.1% 內視為同值
    const close = (a: number, b: number) => Math.abs(a - b) <= 1e-3 * Math.abs(b);
    const mates = g ? present.filter((x) => x in g.short && close(baseOf(x, t), baseOf(tag, t))) : [tag];
    mates.forEach((x) => done.add(x));
    const sep = lang === "zh" ? "／" : " / ";
    const merged = g && mates.length > 1 ? g : null;
    const name = merged
      ? `${nm(merged)}（${mates.map((x) => merged.short[x]![lang === "zh" ? 1 : 0]).join(sep)}）`
      : traitName(tag, t);
    items.push({ key: merged ? merged.key : tag, tag, tags: mates, name });
  }
  const pins = new Set(s.pins);
  const ordered = [...items.filter((x) => pins.has(x.key)), ...items.filter((x) => !pins.has(x.key))];
  const nPinned = ordered.filter((x) => pins.has(x.key)).length;

  const pick = new Set(c.traits.map((x) => x.tag));
  // 合併列的係數若不完全相同，範圍取最寬：下限用最小係數、上限用最大係數
  const range = (tag: TraitTag, scs: number[]) => {
    const m = TRAITS[tag], sign = m.neg ? -1 : 1;
    const byMag = [...scs].sort((a, b) => Math.abs(a) - Math.abs(b));
    return `${fmt(m.unit, sign * val(byMag[0], 0.9), true)} – ${fmt(m.unit, sign * val(byMag[byMag.length - 1], 1.1), true)}`;
  };
  const dash = `<span class="muted">—</span>`;
  const rows = ordered.map((it, i) => {
    const { tag } = it, m = TRAITS[tag], bs = it.tags.map((x) => baseOf(x, t));
    const buff = m.curseOnly ? dash : range(tag, bs.map((b) => buffScale(b, s)));
    const curse = m.pos ? dash : s.curses === 0 ? `<span class="muted">${tr("no-curse")}</span>` : range(tag, bs.map((b) => curseScale(b, s)));
    const b = [...new Set(bs)].join(" / ");
    const outs = new Map<SplicedId, string>();
    for (const x of it.tags) for (const [out, id] of uses[x] ?? []) if (!outs.has(out)) outs.set(out, id);
    const to = [...outs].map(([out, id]) =>
      `<button type="button" class="pick" data-r="${id}">${nm(SPLICED[out])}</button>`).join(lang === "zh" ? "、" : ", ");
    const on = pins.has(it.key);
    const cls = [it.tags.some((x) => pick.has(x)) ? "sel" : "", on ? "pinned" : "", on && i === nPinned - 1 ? "pin-end" : ""].join(" ").trim();
    return `<tr class="${cls}"><td class="pin"><input type="checkbox" class="pinbox" data-k="${it.key}" aria-label="${tr("pin-label", it.name)}"${on ? " checked" : ""}></td><td>${it.name}</td><td class="rollc"><div class="inrow${m.unit === "x" ? " pre" : ""}"><input type="text" class="rollin" id="roll-${it.key}" data-k="${it.key}" data-tag="${tag}" inputmode="decimal" autocomplete="off" aria-label="${tr("roll-val-label", it.name)}"${m.unit === "x" ? ' placeholder="1.12"' : ""}><span class="unit">${m.unit === "x" ? "×" : m.unit === "n" ? "" : m.unit}</span><button type="button" class="clr" data-for="roll-${it.key}" aria-label="${tr("clear")}" title="${tr("clear")}" hidden>✕</button></div><div class="rollout"></div></td><td class="num">${buff}</td><td class="num">${curse}</td><td class="uses">${to}</td><td class="num b">${b}</td></tr>`;
  });
  $("ranges").innerHTML = `<thead><tr><th class="pin">${tr("pin")}</th><th>${tr("attr")}</th><th>${tr("roll-val")}<button type="button" class="rollclr" id="rolls-clear" hidden>${tr("clear")}</button></th><th class="num">${tr("buff-r")}</th><th class="num">${tr("curse-r")}</th><th>${tr("splice-to")}</th><th class="num b">${tr("b-col")}</th></tr></thead><tbody>${rows.join("")}</tbody>`;
  $("ranges-sub").textContent = tr("ranges-sub", nm(RIVEN_TYPES[t]), `${s.lvl} · ${layoutKey(s)}`);
  renderRolls();
}
// 只更新輸入框以外的部分：打字時不能重建表格，否則會掉焦點
export function renderRolls(): void {
  const s = state;
  const rows = [...$("ranges").querySelectorAll<HTMLInputElement>(".rollin")].map((inp) => {
    const str = s.rolls[inp.dataset.k!] ?? "";
    if (document.activeElement !== inp) inp.value = str;
    inp.parentElement!.querySelector<HTMLElement>(".clr")!.hidden = !str;
    return { str, row: inp.closest("tr")!, box: inp.closest("td")!.querySelector<HTMLElement>(".rollout")!, rd: readAnyRole(str, inp.dataset.tag as TraitTag, s) };
  });
  // 四捨五入區間重疊的列分不出高低，一起算同分
  const read = rows.map((x) => x.rd).filter((rd) => rd.kind === "ok");
  const top = read.length > 1 ? read.reduce((a, b) => (b.u > a.u ? b : a)) : null;
  const best = new Set<unknown>(top ? read.filter((rd) => rd.hi >= top.lo) : []);
  for (const x of rows) {
    const { rd, box } = x, on = best.has(rd);
    x.row.classList.toggle("lock", on && best.size === 1);
    box.className = rd.kind === "bad" || rd.kind === "out" ? "rollout err" : "rollout";
    if (rd.kind === "empty") box.textContent = "";
    else if (rd.kind === "bad") box.textContent = tr("roll-bad");
    else if (rd.kind === "out") box.textContent = tr("roll-oor");
    else {
      const a = Math.round(rd.lo * 100), b = Math.round(rd.hi * 100);
      const p = b - a >= 2 ? `p${a}–p${b}` : `p${Math.round(rd.u * 100)}`;
      box.innerHTML = `<b>${p}</b> ×${wOf(rd.u).toFixed(3)} · ${tr(rd.role)}`
        + (on ? `<b class="lock">${tr(best.size === 1 ? "roll-lock" : "roll-tie")}</b>` : "");
    }
  }
  $("rolls-clear").hidden = !rows.some((x) => x.str);
}
