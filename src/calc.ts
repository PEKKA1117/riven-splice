// 紫卡數值計算：不碰 DOM
import {
  BASE, DISPOSITION, L_BUFF, L_CURSE, FACTION_REFS, RECIPES, RIVEN_TYPES, SPLICED, TRAITS,
  type Recipe, type SplicedId, type TagRef, type TraitTag, type Unit,
} from "./data";
import { nm, tr } from "./i18n";
import { state, type Role, type State } from "./state";

// 解析輸入的結果；ok 時 [lo, hi] 是已扣掉顯示四捨五入誤差的擲值區間（0..1）
export interface Rolled { kind: "ok"; lo: number; hi: number; u: number }
type Unread = { kind: "empty" } | { kind: "bad" } | { kind: "out" };
export type Read = Unread | Rolled;
export interface Trait { tag: TraitTag; role: Role; unit: Unit; sc: number; read: Read }
export interface Calc {
  r: Recipe; traits: Trait[]; outSc: number; outUnit: Unit;
  win: number; both: boolean;
  roll: { u: number; lo: number; hi: number } | null;  // 拼接沿用的擲值；沒有任何有效輸入時為 null
}

export const isMelee = (t: number): boolean => RIVEN_TYPES[t].col === 4;
function resolveTag(tag: TagRef, t: number): TraitTag {
  if (tag === "DMG") return isMelee(t) ? "WeaponMeleeDamageMod" : "WeaponDamageAmountMod";
  if (tag in FACTION_REFS) {
    const f = FACTION_REFS[tag as keyof typeof FACTION_REFS];
    return isMelee(t) ? `WeaponMeleeFactionDamage${f}` : `WeaponFactionDamage${f}`;
  }
  return tag as TraitTag;
}
export function recipeTags(r: Recipe, t: number): [TraitTag, TraitTag] { return [resolveTag(r.a, t), resolveTag(r.b, t)]; }
// 配方在這種紫卡上可不可能；回傳 null 或不可能的原因
export function recipeBlock(r: Recipe, t: number): string | null {
  if (SPLICED[r.out].b[RIVEN_TYPES[t].col] == null) return tr("na-class");
  for (const tag of recipeTags(r, t)) if (BASE[tag][t] == null) return tr("na-pool", nm(TRAITS[tag]));
  return null;
}
const f32 = Math.fround;
export const wOf = (u: number): number => f32(0.9 + f32(0.2 * u));
export const layoutKey = (s: State): string => `${s.buffs}+${s.curses}`;
// 這條屬性在這種紫卡上的係數；呼叫前已由 recipeBlock 或列表過濾排除 null
export const baseOf = (tag: TraitTag, t: number): number => BASE[tag][t]!;
// 回傳 W = 1 時的帶號數值，乘上 W 即為實際值；遊戲逐步以 32 位元浮點運算，順序照 wiki
function scaleWith(b: number, L: number, s: State): number {
  return f32(f32(f32(f32(b * 10) * (s.lvl + 1)) * DISPOSITION) * L);
}
export function buffScale(b: number, s: State): number { return scaleWith(b, L_BUFF[layoutKey(s)], s); }
export function curseScale(b: number, s: State): number { return scaleWith(b, L_CURSE[layoutKey(s)], s); }
function traitScale(tag: TraitTag, role: Role, s: State): number {
  const b = baseOf(tag, s.type);
  return role === "curse" ? curseScale(b, s) : buffScale(b, s);
}
export function splicedScale(out: SplicedId, s: State): number {
  // 拼接屬性永遠是正面
  return Math.abs(buffScale(SPLICED[out].b[RIVEN_TYPES[s.type].col]!, s));
}
export const val = (sc: number, w: number): number => f32(sc * w);

// 數值 → 顯示（帶號 v）
function dispNum(unit: Unit, v: number): number { return unit === "%" ? v * 100 : unit === "x" ? 1 + v : v; }
export function fmt(unit: Unit, v: number, signed: boolean): string {
  const d = dispNum(unit, v);
  if (unit === "x") return "×" + d.toFixed(2);
  const sign = signed && d > 0 ? "+" : "";
  return sign + d.toFixed(1) + (unit === "%" ? "%" : unit === "n" ? "" : unit);
}
export const halfStep = (unit: Unit): number => (unit === "%" ? 0.0005 : unit === "x" ? 0.005 : 0.05);
// 派系輸入是倍率還是百分比：倍率實際落在 ×0.55–×1.74，百分比寫法最小約 2.7，以 2 為界不會混淆
const isMult = (n: number): boolean => n >= 0.3 && n <= 2;
// 輸入字串 → 數值的絕對值；派系屬性接受 ×1.12 或 0.88 這種倍率，也接受百分比
export function parseMag(unit: Unit, str: string): number | null {
  const s = String(str).replace(/[×x%,\s+]/gi, (c) => (c === "," ? "." : "")).trim();
  if (s === "" || s === "-") return null;
  const n = Number(s);
  if (!isFinite(n)) return NaN;
  if (unit === "%") return Math.abs(n) / 100;
  if (unit === "x") return isMult(n) ? Math.abs(n - 1) : Math.abs(n) / 100;
  return Math.abs(n);
}
// 數值的絕對值 → 擲值區間 [lo, hi]（0..1），已扣掉顯示四捨五入的誤差
function rollOf(mag: number, tag: TraitTag, role: Role, s: State): Read {
  const sc = Math.abs(traitScale(tag, role, s));
  const h = halfStep(TRAITS[tag].unit);
  const uOf = (m: number): number => (m / sc - 0.9) / 0.2;
  const lo = Math.max(0, uOf(Math.max(0, mag - h))), hi = Math.min(1, uOf(mag + h));
  if (lo > hi) return { kind: "out" };
  return { kind: "ok", lo, hi, u: Math.min(1, Math.max(0, uOf(mag))) };
}
function readTrait(i: number, tag: TraitTag, s: State): Read {
  const mag = parseMag(TRAITS[tag].unit, s.vals[i]);
  if (mag === null) return { kind: "empty" };
  if (Number.isNaN(mag)) return { kind: "bad" };
  return rollOf(mag, tag, s.roles[i], s);
}
// 輸入的是負面嗎：派系看倍率小於 1，其他看負號
function typedCurse(unit: Unit, str: string): boolean {
  const n = Number(String(str).replace(/[×x%\s+]/gi, "").replace(",", "."));
  return unit === "x" && isMult(n) ? n < 1 : n < 0;
}
// 屬性範圍表：不問正負面，從數值判斷。兩種範圍不重疊，只有 3+1 的小數值會因四捨五入同時符合，這時才看輸入的正負
export function readAnyRole(str: string, tag: TraitTag, s: State): Unread | (Rolled & { role: Role }) {
  const m = TRAITS[tag], mag = parseMag(m.unit, str);
  if (mag === null) return { kind: "empty" };
  if (Number.isNaN(mag)) return { kind: "bad" };
  const roles: Role[] = [...(m.curseOnly ? [] : ["buff" as const]), ...(m.pos || s.curses === 0 ? [] : ["curse" as const])];
  const hits = roles.flatMap((role) => {
    const rd = rollOf(mag, tag, role, s);
    return rd.kind === "ok" ? [{ ...rd, role }] : [];
  });
  if (!hits.length) return { kind: "out" };
  return hits.find((x) => x.role === (typedCurse(m.unit, str) ? "curse" : "buff")) ?? hits[0];
}

export function currentRecipe(): Recipe {
  let r = RECIPES.find((x) => x.id === state.recipe);
  if (!r || recipeBlock(r, state.type)) {
    r = RECIPES.find((x) => !recipeBlock(x, state.type))!;
    state.recipe = r.id;
  }
  return r;
}
// 角色限制：無負面槽就全為正面；只會是正面的屬性不能當負面；最多一條負面
export function fixRoles(tags: TraitTag[]): void {
  for (let i = 0; i < 2; i++) {
    if (state.curses === 0 || TRAITS[tags[i]].pos) state.roles[i] = "buff";
  }
  if (state.roles[0] === "curse" && state.roles[1] === "curse") state.roles[1] = "buff";
}
export function setExampleValues(r: Recipe): void {
  // 範例：屬性一擲值 ×0.97，屬性二 ×1.05
  const tags = recipeTags(r, state.type);
  const us = [0.35, 0.75];
  state.vals = tags.map((tag, i) => {
    const v = val(traitScale(tag, state.roles[i], state), wOf(us[i]));
    const d = dispNum(TRAITS[tag].unit, v);
    return TRAITS[tag].unit === "x" ? d.toFixed(2) : d.toFixed(1);
  });
}

// 計算結果（renderCalc / 圖 / 表共用）
export function compute(): Calc {
  const s = state, r = currentRecipe(), tags = recipeTags(r, s.type);
  fixRoles(tags);
  const traits = tags.map((tag, i): Trait => {
    const sc = traitScale(tag, s.roles[i], s);
    return { tag, role: s.roles[i], unit: TRAITS[tag].unit, sc, read: readTrait(i, tag, s) };
  });
  const outSc = splicedScale(r.out, s);
  const rs = traits.map((x) => x.read).filter((x) => x.kind === "ok");
  const both = rs.length === 2;
  const win = both ? (rs[0].u >= rs[1].u ? 0 : 1) : rs.length ? traits.findIndex((x) => x.read.kind === "ok") : -1;
  const roll = rs.length
    ? { u: Math.max(...rs.map((x) => x.u)), lo: Math.max(...rs.map((x) => x.lo)), hi: Math.max(...rs.map((x) => x.hi)) }
    : null;
  return { r, traits, outSc, outUnit: SPLICED[r.out].unit, win, both, roll };
}
