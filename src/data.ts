// 遊戲資料與常數：全部取自 Riven Mods wiki，不含任何畫面邏輯

export type Unit = "%" | "x" | "s" | "m" | "n";
export interface Named { en: string; zh: string }
export interface RivenType extends Named { id: string; col: number }
export type Coeffs = (number | null)[];
export interface TraitDef extends Named { unit: Unit; pos?: boolean; neg?: boolean; curseOnly?: boolean }
export interface SplicedDef extends Named { unit: Unit; b: Coeffs }

// 紫卡類型；col = 拼接屬性基礎係數表的欄（步槍/霰彈/手槍(含 kitgun)/Archgun/近戰(含 zaw)）
export const RIVEN_TYPES: RivenType[] = [
  { id: "LotusRifleRandomModRare",         en: "Rifle",   zh: "步槍",       col: 0 },
  { id: "LotusShotgunRandomModRare",       en: "Shotgun", zh: "霰彈槍",     col: 1 },
  { id: "LotusPistolRandomModRare",        en: "Pistol",  zh: "手槍",       col: 2 },
  { id: "LotusModularPistolRandomModRare", en: "Kitgun",  zh: "組合槍",     col: 2 },
  { id: "LotusArchgunRandomModRare",       en: "Archgun", zh: "空戰武器",   col: 3 },
  { id: "PlayerMeleeWeaponRandomModRare",  en: "Melee",   zh: "近戰",       col: 4 },
  { id: "LotusModularMeleeRandomModRare",  en: "Zaw",     zh: "Zaw",       col: 4 },
];

// 一般屬性基礎係數 b（Riven Mods wiki「Ordinary attribute base coefficients」），依 RIVEN_TYPES 順序；null = 該類型不會出現（wiki 表中的「–」）
const _5 = (v: number): Coeffs => [v, v, v, v, v, null, null];
const _M = (v: number): Coeffs => [null, null, null, null, null, v, v];
export const BASE = {
  WeaponClipMaxMod:              [0.005555, 0.005555, 0.005555, 0.005555, 0.0067, null, null],
  WeaponReloadSpeedMod:          [0.005555, 0.005555, 0.005555, 0.005555, 0.0111, null, null],
  WeaponRecoilReductionMod:      _5(-0.01),
  WeaponAmmoMaxMod:              [0.00555, 0.01, 0.01, 0.01, 0.0111, null, null],
  WeaponFireDamageMod:           [0.01, 0.01, 0.01, 0.01, 0.0133, 0.01, 0.01],
  WeaponFreezeDamageMod:         [0.01, 0.01, 0.01, 0.01, 0.0133, 0.01, 0.01],
  WeaponToxinDamageMod:          [0.01, 0.01, 0.01, 0.01, 0.0133, 0.01, 0.01],
  WeaponElectricityDamageMod:    [0.01, 0.01, 0.01, 0.01, 0.0133, 0.01, 0.01],
  WeaponFactionDamageCorpus:     _5(0.005),
  WeaponFactionDamageGrineer:    _5(0.005),
  WeaponFactionDamageInfested:   _5(0.005),
  WeaponMeleeFactionDamageCorpus:   _M(0.005),
  WeaponMeleeFactionDamageGrineer:  _M(0.005),
  WeaponMeleeFactionDamageInfested: _M(0.005),
  WeaponMeleeComboEfficiencyMod: _M(0.00816),
  ComboDurationMod:              _M(0.09),
  WeaponMeleeComboBonusOnHitMod: _M(0.00653),
  WeaponFireRateMod:             [0.00667, 0.01, 0.0083, 0.0083, 0.00667, 0.0061, 0.0061],
  WeaponMeleeRangeIncMod:        _M(0.02158),
  WeaponMeleeDamageMod:          _M(0.0183),
  WeaponDamageAmountMod:         [0.0183333, 0.0183, 0.0244, 0.0244, 0.0111, null, null],
  WeaponStunChanceMod:           [0.01, 0.01, 0.01, 0.01, 0.0067, 0.01, 0.01],
  WeaponZoomFovMod:              [0.006666, 0.004666, 0.0089, 0.0089, 0.006666, null, null],
  WeaponFireIterationsMod:       [0.01, 0.0133, 0.0133, 0.0133, 0.0067, null, null],
  WeaponCritChanceMod:           [0.016666, 0.01, 0.016666, 0.016666, 0.0111, 0.02, 0.02],
  // 以下只出現在屬性範圍分頁
  WeaponArmorPiercingDamageMod:  [0.01333, 0.01333, 0.01333, 0.01333, 0.01, 0.0133, 0.0133],
  WeaponImpactDamageMod:         [0.013333, 0.013333, 0.013333, 0.013333, 0.01, 0.0133, 0.0133],
  WeaponSlashDamageMod:          [0.013333, 0.013333, 0.013333, 0.013333, 0.01, 0.0133, 0.0133],
  WeaponCritDamageMod:           [0.013333, 0.01, 0.01, 0.01, 0.0089, 0.01, 0.01],
  WeaponProcTimeMod:             [0.01111, 0.01111, 0.01111, 0.01111, 0.01111, 0.01111, 0.01111],
  WeaponProjectileSpeedMod:      [0.01, 0.01, 0.01, 0.01, null, null, null],
  WeaponPunctureDepthMod:        _5(0.03),
  SlideAttackCritChanceMod:      _M(0.013334),
  WeaponMeleeFinisherDamageMod:  _M(0.0133),
  WeaponMeleeComboInitialBonusMod: _M(0.27224),
  WeaponMeleeComboPointsOnHitMod:  _M(-0.01165),
} satisfies Record<string, Coeffs>;
export type TraitTag = keyof typeof BASE;

// 屬性名稱（中文取自遊戲官方繁中字串）；unit：% 百分比、x 派系倍率、s 秒、m 公尺；
// pos = 只會是正面、curseOnly = 只會是負面，依同一張 wiki 表的註記 1 / 3（「Damage / Melee Damage」的註記 1 標在近戰傷害後，遠程傷害正負皆可）
export const TRAITS: Record<TraitTag, TraitDef> = {
  WeaponClipMaxMod:              { en: "Magazine Capacity", zh: "彈匣容量", unit: "%" },
  WeaponReloadSpeedMod:          { en: "Reload Speed", zh: "裝填速度", unit: "%" },
  WeaponRecoilReductionMod:      { en: "Weapon Recoil", zh: "武器後座力", unit: "%" },
  WeaponAmmoMaxMod:              { en: "Ammo Maximum", zh: "彈藥最大值", unit: "%" },
  WeaponFireDamageMod:           { en: "Heat", zh: "火焰傷害", unit: "%", pos: true },
  WeaponFreezeDamageMod:         { en: "Cold", zh: "冰凍傷害", unit: "%", pos: true },
  WeaponToxinDamageMod:          { en: "Toxin", zh: "毒素傷害", unit: "%", pos: true },
  WeaponElectricityDamageMod:    { en: "Electricity", zh: "電擊傷害", unit: "%", pos: true },
  WeaponFactionDamageCorpus:     { en: "Damage to Corpus", zh: "對 Corpus 傷害", unit: "x" },
  WeaponFactionDamageGrineer:    { en: "Damage to Grineer", zh: "對 Grineer 傷害", unit: "x" },
  WeaponFactionDamageInfested:   { en: "Damage to Infested", zh: "對 Infested 傷害", unit: "x" },
  WeaponMeleeFactionDamageCorpus:   { en: "Damage to Corpus", zh: "對 Corpus 傷害", unit: "x" },
  WeaponMeleeFactionDamageGrineer:  { en: "Damage to Grineer", zh: "對 Grineer 傷害", unit: "x" },
  WeaponMeleeFactionDamageInfested: { en: "Damage to Infested", zh: "對 Infested 傷害", unit: "x" },
  WeaponMeleeComboEfficiencyMod: { en: "Heavy Attack Efficiency", zh: "重擊效率", unit: "%" },
  ComboDurationMod:              { en: "Combo Duration", zh: "連擊持續時間", unit: "s" },
  WeaponMeleeComboBonusOnHitMod: { en: "Additional Combo Count Chance", zh: "額外連擊數機率", unit: "%", pos: true },
  WeaponFireRateMod:             { en: "Attack Speed", zh: "攻擊速度", unit: "%" },
  WeaponMeleeRangeIncMod:        { en: "Range", zh: "攻擊範圍", unit: "m" },
  WeaponMeleeDamageMod:          { en: "Melee Damage", zh: "近戰傷害", unit: "%", pos: true },
  WeaponDamageAmountMod:         { en: "Damage", zh: "傷害", unit: "%" },
  WeaponStunChanceMod:           { en: "Status Chance", zh: "觸發機率", unit: "%" },
  WeaponZoomFovMod:              { en: "Zoom", zh: "變焦", unit: "%" },
  WeaponFireIterationsMod:       { en: "Multishot", zh: "多重射擊", unit: "%" },
  WeaponCritChanceMod:           { en: "Critical Chance", zh: "暴擊機率", unit: "%" },
  WeaponArmorPiercingDamageMod:  { en: "Puncture", zh: "穿刺傷害", unit: "%" },
  WeaponImpactDamageMod:         { en: "Impact", zh: "衝擊傷害", unit: "%" },
  WeaponSlashDamageMod:          { en: "Slash", zh: "切割傷害", unit: "%" },
  WeaponCritDamageMod:           { en: "Critical Damage", zh: "暴擊傷害", unit: "%" },
  WeaponProcTimeMod:             { en: "Status Duration", zh: "狀態持續時間", unit: "%" },
  WeaponProjectileSpeedMod:      { en: "Projectile Speed", zh: "投射物速度", unit: "%" },
  WeaponPunctureDepthMod:        { en: "Punch Through", zh: "穿透", unit: "m", pos: true },
  SlideAttackCritChanceMod:      { en: "Critical Chance for Slide Attack", zh: "滑行攻擊暴擊機率", unit: "%" },
  WeaponMeleeFinisherDamageMod:  { en: "Finisher Damage", zh: "處決傷害", unit: "%" },
  WeaponMeleeComboInitialBonusMod: { en: "Initial Combo", zh: "起始連擊數", unit: "n", pos: true },
  // 只會是負面；遊戲以 −100v% 顯示
  WeaponMeleeComboPointsOnHitMod:  { en: "Chance to Gain Combo Count", zh: "機率獲得連擊數", unit: "%", neg: true, curseOnly: true },
};

// 拼接屬性與其基礎係數（Riven Mods wiki「Spliced attribute base coefficients」），欄 = RIVEN_TYPES.col
export const SPLICED = {
  ammoeff:   { en: "Ammo Efficiency", zh: "彈藥效率", unit: "%", b: [-0.005, -0.005, -0.005, -0.005, null] },
  blast:     { en: "Blast", zh: "爆炸傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
  corrosive: { en: "Corrosive", zh: "腐蝕傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
  gas:       { en: "Gas", zh: "毒氣傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
  magnetic:  { en: "Magnetic", zh: "磁力傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
  radiation: { en: "Radiation", zh: "輻射傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
  viral:     { en: "Viral", zh: "病毒傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
  orokin:    { en: "Damage to Orokin", zh: "對 Orokin 傷害", unit: "x", b: [0.005, 0.005, 0.005, 0.005, 0.005] },
  scaldra:   { en: "Damage to Scaldra", zh: "對清剿隊傷害", unit: "x", b: [0.005, 0.005, 0.005, 0.005, 0.005] },
  techrot:   { en: "Damage to Techrot", zh: "對科腐者傷害", unit: "x", b: [0.005, 0.005, 0.005, 0.005, 0.005] },
  status:    { en: "Status Damage", zh: "異常狀態傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
  holster:   { en: "Reload While Holstered", zh: "收起時裝填", unit: "%", b: [0.01, 0.01, 0.01, null, null] },
  wpdmg:     { en: "Weakpoint Damage", zh: "弱點傷害", unit: "%", b: [0.025, 0.025, 0.025, 0.025, null] },
  wpcrit:    { en: "Weakpoint Critical Chance", zh: "命中弱點暴擊機率", unit: "%", b: [0.0275, 0.0275, 0.0275, 0.0275, null] },
  windup:    { en: "Heavy Attack Wind Up Speed", zh: "重擊蓄力速度", unit: "%", b: [null, null, null, null, 0.0133] },
  heavydmg:  { en: "Melee Damage on Heavy Attack", zh: "重擊時近戰傷害", unit: "%", b: [null, null, null, null, 0.0133] },
  parry:     { en: "Parry Angle", zh: "格擋角度", unit: "%", b: [null, null, null, null, 0.009] },
  slam:      { en: "Slam Attack Damage", zh: "震地攻擊傷害", unit: "%", b: [null, null, null, null, 0.0133] },
} satisfies Record<string, SplicedDef>;
export type SplicedId = keyof typeof SPLICED;

// 配方：同一拼接屬性的不同來源各算一條。F* / DMG 依近戰與否換成對應 tag
export const GROUPS = ["elem", "fac", "gen", "ranged", "melee"] as const;
export type Group = (typeof GROUPS)[number];
export const FACTION_REFS = { FCorpus: "Corpus", FGrineer: "Grineer", FInfested: "Infested" } as const;
export type TagRef = TraitTag | "DMG" | keyof typeof FACTION_REFS;
export interface Recipe { id: string; out: SplicedId; a: TagRef; b: TagRef; g: Group }
export const RECIPES: Recipe[] = [
  { id: "blast",     out: "blast",     a: "WeaponFireDamageMod",        b: "WeaponFreezeDamageMod",      g: "elem" },
  { id: "corrosive", out: "corrosive", a: "WeaponToxinDamageMod",       b: "WeaponElectricityDamageMod", g: "elem" },
  { id: "gas",       out: "gas",       a: "WeaponToxinDamageMod",       b: "WeaponFireDamageMod",        g: "elem" },
  { id: "magnetic",  out: "magnetic",  a: "WeaponElectricityDamageMod", b: "WeaponFreezeDamageMod",      g: "elem" },
  { id: "radiation", out: "radiation", a: "WeaponFireDamageMod",        b: "WeaponElectricityDamageMod", g: "elem" },
  { id: "viral",     out: "viral",     a: "WeaponToxinDamageMod",       b: "WeaponFreezeDamageMod",      g: "elem" },
  { id: "orokin",    out: "orokin",    a: "FGrineer", b: "FCorpus",   g: "fac" },
  { id: "scaldra",   out: "scaldra",   a: "FInfested", b: "FGrineer", g: "fac" },
  { id: "techrot",   out: "techrot",   a: "FCorpus", b: "FInfested",  g: "fac" },
  { id: "status",    out: "status",    a: "DMG", b: "WeaponStunChanceMod", g: "gen" },
  { id: "wpcrit-ms", out: "wpcrit",    a: "WeaponCritChanceMod",   b: "WeaponFireIterationsMod", g: "ranged" },
  { id: "wpcrit-zm", out: "wpcrit",    a: "WeaponCritChanceMod",   b: "WeaponZoomFovMod",        g: "ranged" },
  { id: "wpdmg-ms",  out: "wpdmg",     a: "WeaponDamageAmountMod", b: "WeaponFireIterationsMod", g: "ranged" },
  { id: "wpdmg-zm",  out: "wpdmg",     a: "WeaponDamageAmountMod", b: "WeaponZoomFovMod",        g: "ranged" },
  { id: "ammoeff-mr", out: "ammoeff",  a: "WeaponClipMaxMod",         b: "WeaponReloadSpeedMod", g: "ranged" },
  { id: "ammoeff-ra", out: "ammoeff",  a: "WeaponRecoilReductionMod", b: "WeaponAmmoMaxMod",     g: "ranged" },
  { id: "holster-ar", out: "holster",  a: "WeaponAmmoMaxMod", b: "WeaponReloadSpeedMod", g: "ranged" },
  { id: "holster-am", out: "holster",  a: "WeaponAmmoMaxMod", b: "WeaponClipMaxMod",     g: "ranged" },
  { id: "windup",    out: "windup",    a: "WeaponMeleeComboEfficiencyMod", b: "ComboDurationMod",              g: "melee" },
  { id: "heavydmg",  out: "heavydmg",  a: "WeaponMeleeComboEfficiencyMod", b: "WeaponMeleeComboBonusOnHitMod", g: "melee" },
  { id: "parry",     out: "parry",     a: "WeaponFireRateMod",    b: "WeaponMeleeRangeIncMod", g: "melee" },
  { id: "slam",      out: "slam",      a: "WeaponMeleeDamageMod", b: "WeaponFireRateMod",      g: "melee" },
];

// 紫卡數值常數（Riven Mods wiki）：v = b × 10 × (r + 1) × D × L × W
// 傾向已於 44.1.3 退役，所有武器固定 D = 1.2
export const DISPOSITION = 1.2;
// L：依正負面條數的正面/負面倍率
export const L_BUFF: Record<string, number> = { "2+0": 0.99, "2+1": 1.2375, "3+0": 0.75, "3+1": 0.9375 };
export const L_CURSE: Record<string, number> = { "2+1": -0.495, "3+1": -0.75 };
export const LAYOUTS = [[2, 0], [2, 1], [3, 0], [3, 1]];
export const REACH_W = [0.90, 0.92, 0.94, 0.96, 0.98, 1.00, 1.02, 1.04, 1.06, 1.08, 1.10];

// 屬性範圍表的列順序：傷害 → 暴擊 → 元素 → 物理 → 派系 → 彈藥與操控 → 近戰專屬
export const RANGE_ORDER: TraitTag[] = [
  "WeaponDamageAmountMod", "WeaponMeleeDamageMod", "WeaponFireIterationsMod", "WeaponFireRateMod",
  "WeaponCritChanceMod", "WeaponCritDamageMod", "SlideAttackCritChanceMod",
  "WeaponStunChanceMod", "WeaponProcTimeMod",
  "WeaponFireDamageMod", "WeaponFreezeDamageMod", "WeaponToxinDamageMod", "WeaponElectricityDamageMod",
  "WeaponImpactDamageMod", "WeaponArmorPiercingDamageMod", "WeaponSlashDamageMod",
  "WeaponFactionDamageCorpus", "WeaponFactionDamageGrineer", "WeaponFactionDamageInfested",
  "WeaponMeleeFactionDamageCorpus", "WeaponMeleeFactionDamageGrineer", "WeaponMeleeFactionDamageInfested",
  "WeaponClipMaxMod", "WeaponReloadSpeedMod", "WeaponAmmoMaxMod", "WeaponRecoilReductionMod",
  "WeaponZoomFovMod", "WeaponProjectileSpeedMod", "WeaponPunctureDepthMod",
  "WeaponMeleeRangeIncMod", "WeaponMeleeFinisherDamageMod", "WeaponMeleeComboEfficiencyMod",
  "ComboDurationMod", "WeaponMeleeComboInitialBonusMod", "WeaponMeleeComboBonusOnHitMod", "WeaponMeleeComboPointsOnHitMod",
];
// 數值相同時合併成一列的屬性群組；short = 合併列括號內的簡稱
export interface MergeGroup extends Named { key: string; short: Partial<Record<TraitTag, [string, string]>> }
export const MERGE: MergeGroup[] = [
  { key: "elem", en: "Elemental damage", zh: "元素傷害", short: {
      WeaponFireDamageMod: ["Heat", "火焰"], WeaponFreezeDamageMod: ["Cold", "冰凍"],
      WeaponToxinDamageMod: ["Toxin", "毒素"], WeaponElectricityDamageMod: ["Electricity", "電擊"] } },
  { key: "phys", en: "Physical damage", zh: "物理傷害", short: {
      WeaponImpactDamageMod: ["Impact", "衝擊"], WeaponArmorPiercingDamageMod: ["Puncture", "穿刺"],
      WeaponSlashDamageMod: ["Slash", "切割"] } },
  { key: "fac", en: "Faction damage", zh: "派系傷害", short: {
      WeaponFactionDamageCorpus: ["Corpus", "Corpus"], WeaponFactionDamageGrineer: ["Grineer", "Grineer"],
      WeaponFactionDamageInfested: ["Infested", "Infested"],
      WeaponMeleeFactionDamageCorpus: ["Corpus", "Corpus"], WeaponMeleeFactionDamageGrineer: ["Grineer", "Grineer"],
      WeaponMeleeFactionDamageInfested: ["Infested", "Infested"] } },
];
