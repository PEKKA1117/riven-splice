"use strict";
(() => {
  // src/data.ts
  var RIVEN_TYPES = [
    { id: "LotusRifleRandomModRare", en: "Rifle", zh: "步槍", col: 0 },
    { id: "LotusShotgunRandomModRare", en: "Shotgun", zh: "霰彈槍", col: 1 },
    { id: "LotusPistolRandomModRare", en: "Pistol", zh: "手槍", col: 2 },
    { id: "LotusModularPistolRandomModRare", en: "Kitgun", zh: "組合槍", col: 2 },
    { id: "LotusArchgunRandomModRare", en: "Archgun", zh: "空戰武器", col: 3 },
    { id: "PlayerMeleeWeaponRandomModRare", en: "Melee", zh: "近戰", col: 4 },
    { id: "LotusModularMeleeRandomModRare", en: "Zaw", zh: "Zaw", col: 4 }
  ];
  var _5 = (v) => [v, v, v, v, v, null, null];
  var _M = (v) => [null, null, null, null, null, v, v];
  var BASE = {
    WeaponClipMaxMod: [5555e-6, 5555e-6, 5555e-6, 5555e-6, 67e-4, null, null],
    WeaponReloadSpeedMod: [5555e-6, 5555e-6, 5555e-6, 5555e-6, 0.0111, null, null],
    WeaponRecoilReductionMod: _5(-0.01),
    WeaponAmmoMaxMod: [555e-5, 0.01, 0.01, 0.01, 0.0111, null, null],
    WeaponFireDamageMod: [0.01, 0.01, 0.01, 0.01, 0.0133, 0.01, 0.01],
    WeaponFreezeDamageMod: [0.01, 0.01, 0.01, 0.01, 0.0133, 0.01, 0.01],
    WeaponToxinDamageMod: [0.01, 0.01, 0.01, 0.01, 0.0133, 0.01, 0.01],
    WeaponElectricityDamageMod: [0.01, 0.01, 0.01, 0.01, 0.0133, 0.01, 0.01],
    WeaponFactionDamageCorpus: _5(5e-3),
    WeaponFactionDamageGrineer: _5(5e-3),
    WeaponFactionDamageInfested: _5(5e-3),
    WeaponMeleeFactionDamageCorpus: _M(5e-3),
    WeaponMeleeFactionDamageGrineer: _M(5e-3),
    WeaponMeleeFactionDamageInfested: _M(5e-3),
    WeaponMeleeComboEfficiencyMod: _M(816e-5),
    ComboDurationMod: _M(0.09),
    WeaponMeleeComboBonusOnHitMod: _M(653e-5),
    WeaponFireRateMod: [667e-5, 0.01, 83e-4, 83e-4, 667e-5, 61e-4, 61e-4],
    WeaponMeleeRangeIncMod: _M(0.02158),
    WeaponMeleeDamageMod: _M(0.0183),
    WeaponDamageAmountMod: [0.0183333, 0.0183, 0.0244, 0.0244, 0.0111, null, null],
    WeaponStunChanceMod: [0.01, 0.01, 0.01, 0.01, 67e-4, 0.01, 0.01],
    WeaponZoomFovMod: [6666e-6, 4666e-6, 89e-4, 89e-4, 6666e-6, null, null],
    WeaponFireIterationsMod: [0.01, 0.0133, 0.0133, 0.0133, 67e-4, null, null],
    WeaponCritChanceMod: [0.016666, 0.01, 0.016666, 0.016666, 0.0111, 0.02, 0.02],
    // 以下只出現在屬性範圍分頁
    WeaponArmorPiercingDamageMod: [0.01333, 0.01333, 0.01333, 0.01333, 0.01, 0.0133, 0.0133],
    WeaponImpactDamageMod: [0.013333, 0.013333, 0.013333, 0.013333, 0.01, 0.0133, 0.0133],
    WeaponSlashDamageMod: [0.013333, 0.013333, 0.013333, 0.013333, 0.01, 0.0133, 0.0133],
    WeaponCritDamageMod: [0.013333, 0.01, 0.01, 0.01, 89e-4, 0.01, 0.01],
    WeaponProcTimeMod: [0.01111, 0.01111, 0.01111, 0.01111, 0.01111, 0.01111, 0.01111],
    WeaponProjectileSpeedMod: [0.01, 0.01, 0.01, 0.01, null, null, null],
    WeaponPunctureDepthMod: _5(0.03),
    SlideAttackCritChanceMod: _M(0.013334),
    WeaponMeleeFinisherDamageMod: _M(0.0133),
    WeaponMeleeComboInitialBonusMod: _M(0.27224),
    WeaponMeleeComboPointsOnHitMod: _M(-0.01165)
  };
  var TRAITS = {
    WeaponClipMaxMod: { en: "Magazine Capacity", zh: "彈匣容量", unit: "%" },
    WeaponReloadSpeedMod: { en: "Reload Speed", zh: "裝填速度", unit: "%" },
    WeaponRecoilReductionMod: { en: "Weapon Recoil", zh: "武器後座力", unit: "%" },
    WeaponAmmoMaxMod: { en: "Ammo Maximum", zh: "彈藥最大值", unit: "%" },
    WeaponFireDamageMod: { en: "Heat", zh: "火焰傷害", unit: "%", pos: true },
    WeaponFreezeDamageMod: { en: "Cold", zh: "冰凍傷害", unit: "%", pos: true },
    WeaponToxinDamageMod: { en: "Toxin", zh: "毒素傷害", unit: "%", pos: true },
    WeaponElectricityDamageMod: { en: "Electricity", zh: "電擊傷害", unit: "%", pos: true },
    WeaponFactionDamageCorpus: { en: "Damage to Corpus", zh: "對 Corpus 傷害", unit: "x" },
    WeaponFactionDamageGrineer: { en: "Damage to Grineer", zh: "對 Grineer 傷害", unit: "x" },
    WeaponFactionDamageInfested: { en: "Damage to Infested", zh: "對 Infested 傷害", unit: "x" },
    WeaponMeleeFactionDamageCorpus: { en: "Damage to Corpus", zh: "對 Corpus 傷害", unit: "x" },
    WeaponMeleeFactionDamageGrineer: { en: "Damage to Grineer", zh: "對 Grineer 傷害", unit: "x" },
    WeaponMeleeFactionDamageInfested: { en: "Damage to Infested", zh: "對 Infested 傷害", unit: "x" },
    WeaponMeleeComboEfficiencyMod: { en: "Heavy Attack Efficiency", zh: "重擊效率", unit: "%" },
    ComboDurationMod: { en: "Combo Duration", zh: "連擊持續時間", unit: "s" },
    WeaponMeleeComboBonusOnHitMod: { en: "Additional Combo Count Chance", zh: "額外連擊數機率", unit: "%", pos: true },
    WeaponFireRateMod: { en: "Attack Speed", zh: "攻擊速度", unit: "%" },
    WeaponMeleeRangeIncMod: { en: "Range", zh: "攻擊範圍", unit: "m" },
    WeaponMeleeDamageMod: { en: "Melee Damage", zh: "近戰傷害", unit: "%", pos: true },
    WeaponDamageAmountMod: { en: "Damage", zh: "傷害", unit: "%" },
    WeaponStunChanceMod: { en: "Status Chance", zh: "觸發機率", unit: "%" },
    WeaponZoomFovMod: { en: "Zoom", zh: "變焦", unit: "%" },
    WeaponFireIterationsMod: { en: "Multishot", zh: "多重射擊", unit: "%" },
    WeaponCritChanceMod: { en: "Critical Chance", zh: "暴擊機率", unit: "%" },
    WeaponArmorPiercingDamageMod: { en: "Puncture", zh: "穿刺傷害", unit: "%" },
    WeaponImpactDamageMod: { en: "Impact", zh: "衝擊傷害", unit: "%" },
    WeaponSlashDamageMod: { en: "Slash", zh: "切割傷害", unit: "%" },
    WeaponCritDamageMod: { en: "Critical Damage", zh: "暴擊傷害", unit: "%" },
    WeaponProcTimeMod: { en: "Status Duration", zh: "狀態持續時間", unit: "%" },
    WeaponProjectileSpeedMod: { en: "Projectile Speed", zh: "投射物速度", unit: "%" },
    WeaponPunctureDepthMod: { en: "Punch Through", zh: "穿透", unit: "m", pos: true },
    SlideAttackCritChanceMod: { en: "Critical Chance for Slide Attack", zh: "滑行攻擊暴擊機率", unit: "%" },
    WeaponMeleeFinisherDamageMod: { en: "Finisher Damage", zh: "處決傷害", unit: "%" },
    WeaponMeleeComboInitialBonusMod: { en: "Initial Combo", zh: "起始連擊數", unit: "n", pos: true },
    // 只會是負面；遊戲以 −100v% 顯示
    WeaponMeleeComboPointsOnHitMod: { en: "Chance to Gain Combo Count", zh: "機率獲得連擊數", unit: "%", neg: true, curseOnly: true }
  };
  var SPLICED = {
    ammoeff: { en: "Ammo Efficiency", zh: "彈藥效率", unit: "%", b: [-5e-3, -5e-3, -5e-3, -5e-3, null] },
    blast: { en: "Blast", zh: "爆炸傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
    corrosive: { en: "Corrosive", zh: "腐蝕傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
    gas: { en: "Gas", zh: "毒氣傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
    magnetic: { en: "Magnetic", zh: "磁力傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
    radiation: { en: "Radiation", zh: "輻射傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
    viral: { en: "Viral", zh: "病毒傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
    orokin: { en: "Damage to Orokin", zh: "對 Orokin 傷害", unit: "x", b: [5e-3, 5e-3, 5e-3, 5e-3, 5e-3] },
    scaldra: { en: "Damage to Scaldra", zh: "對清剿隊傷害", unit: "x", b: [5e-3, 5e-3, 5e-3, 5e-3, 5e-3] },
    techrot: { en: "Damage to Techrot", zh: "對科腐者傷害", unit: "x", b: [5e-3, 5e-3, 5e-3, 5e-3, 5e-3] },
    status: { en: "Status Damage", zh: "異常狀態傷害", unit: "%", b: [0.01, 0.01, 0.01, 0.01, 0.01] },
    holster: { en: "Reload While Holstered", zh: "收起時裝填", unit: "%", b: [0.01, 0.01, 0.01, null, null] },
    wpdmg: { en: "Weakpoint Damage", zh: "弱點傷害", unit: "%", b: [0.025, 0.025, 0.025, 0.025, null] },
    wpcrit: { en: "Weakpoint Critical Chance", zh: "命中弱點暴擊機率", unit: "%", b: [0.0275, 0.0275, 0.0275, 0.0275, null] },
    windup: { en: "Heavy Attack Wind Up Speed", zh: "重擊蓄力速度", unit: "%", b: [null, null, null, null, 0.0133] },
    heavydmg: { en: "Melee Damage on Heavy Attack", zh: "重擊時近戰傷害", unit: "%", b: [null, null, null, null, 0.0133] },
    parry: { en: "Parry Angle", zh: "格擋角度", unit: "%", b: [null, null, null, null, 9e-3] },
    slam: { en: "Slam Attack Damage", zh: "震地攻擊傷害", unit: "%", b: [null, null, null, null, 0.0133] }
  };
  var GROUPS = ["elem", "fac", "gen", "ranged", "melee"];
  var FACTION_REFS = { FCorpus: "Corpus", FGrineer: "Grineer", FInfested: "Infested" };
  var RECIPES = [
    { id: "blast", out: "blast", a: "WeaponFireDamageMod", b: "WeaponFreezeDamageMod", g: "elem" },
    { id: "corrosive", out: "corrosive", a: "WeaponToxinDamageMod", b: "WeaponElectricityDamageMod", g: "elem" },
    { id: "gas", out: "gas", a: "WeaponToxinDamageMod", b: "WeaponFireDamageMod", g: "elem" },
    { id: "magnetic", out: "magnetic", a: "WeaponElectricityDamageMod", b: "WeaponFreezeDamageMod", g: "elem" },
    { id: "radiation", out: "radiation", a: "WeaponFireDamageMod", b: "WeaponElectricityDamageMod", g: "elem" },
    { id: "viral", out: "viral", a: "WeaponToxinDamageMod", b: "WeaponFreezeDamageMod", g: "elem" },
    { id: "orokin", out: "orokin", a: "FGrineer", b: "FCorpus", g: "fac" },
    { id: "scaldra", out: "scaldra", a: "FInfested", b: "FGrineer", g: "fac" },
    { id: "techrot", out: "techrot", a: "FCorpus", b: "FInfested", g: "fac" },
    { id: "status", out: "status", a: "DMG", b: "WeaponStunChanceMod", g: "gen" },
    { id: "wpcrit-ms", out: "wpcrit", a: "WeaponCritChanceMod", b: "WeaponFireIterationsMod", g: "ranged" },
    { id: "wpcrit-zm", out: "wpcrit", a: "WeaponCritChanceMod", b: "WeaponZoomFovMod", g: "ranged" },
    { id: "wpdmg-ms", out: "wpdmg", a: "WeaponDamageAmountMod", b: "WeaponFireIterationsMod", g: "ranged" },
    { id: "wpdmg-zm", out: "wpdmg", a: "WeaponDamageAmountMod", b: "WeaponZoomFovMod", g: "ranged" },
    { id: "ammoeff-mr", out: "ammoeff", a: "WeaponClipMaxMod", b: "WeaponReloadSpeedMod", g: "ranged" },
    { id: "ammoeff-ra", out: "ammoeff", a: "WeaponRecoilReductionMod", b: "WeaponAmmoMaxMod", g: "ranged" },
    { id: "holster-ar", out: "holster", a: "WeaponAmmoMaxMod", b: "WeaponReloadSpeedMod", g: "ranged" },
    { id: "holster-am", out: "holster", a: "WeaponAmmoMaxMod", b: "WeaponClipMaxMod", g: "ranged" },
    { id: "windup", out: "windup", a: "WeaponMeleeComboEfficiencyMod", b: "ComboDurationMod", g: "melee" },
    { id: "heavydmg", out: "heavydmg", a: "WeaponMeleeComboEfficiencyMod", b: "WeaponMeleeComboBonusOnHitMod", g: "melee" },
    { id: "parry", out: "parry", a: "WeaponFireRateMod", b: "WeaponMeleeRangeIncMod", g: "melee" },
    { id: "slam", out: "slam", a: "WeaponMeleeDamageMod", b: "WeaponFireRateMod", g: "melee" }
  ];
  var DISPOSITION = 1.2;
  var L_BUFF = { "2+0": 0.99, "2+1": 1.2375, "3+0": 0.75, "3+1": 0.9375 };
  var L_CURSE = { "2+1": -0.495, "3+1": -0.75 };
  var LAYOUTS = [[2, 0], [2, 1], [3, 0], [3, 1]];
  var REACH_W = [0.9, 0.92, 0.94, 0.96, 0.98, 1, 1.02, 1.04, 1.06, 1.08, 1.1];
  var RANGE_ORDER = [
    "WeaponDamageAmountMod",
    "WeaponMeleeDamageMod",
    "WeaponFireIterationsMod",
    "WeaponFireRateMod",
    "WeaponCritChanceMod",
    "WeaponCritDamageMod",
    "SlideAttackCritChanceMod",
    "WeaponStunChanceMod",
    "WeaponProcTimeMod",
    "WeaponFireDamageMod",
    "WeaponFreezeDamageMod",
    "WeaponToxinDamageMod",
    "WeaponElectricityDamageMod",
    "WeaponImpactDamageMod",
    "WeaponArmorPiercingDamageMod",
    "WeaponSlashDamageMod",
    "WeaponFactionDamageCorpus",
    "WeaponFactionDamageGrineer",
    "WeaponFactionDamageInfested",
    "WeaponMeleeFactionDamageCorpus",
    "WeaponMeleeFactionDamageGrineer",
    "WeaponMeleeFactionDamageInfested",
    "WeaponClipMaxMod",
    "WeaponReloadSpeedMod",
    "WeaponAmmoMaxMod",
    "WeaponRecoilReductionMod",
    "WeaponZoomFovMod",
    "WeaponProjectileSpeedMod",
    "WeaponPunctureDepthMod",
    "WeaponMeleeRangeIncMod",
    "WeaponMeleeFinisherDamageMod",
    "WeaponMeleeComboEfficiencyMod",
    "ComboDurationMod",
    "WeaponMeleeComboInitialBonusMod",
    "WeaponMeleeComboBonusOnHitMod",
    "WeaponMeleeComboPointsOnHitMod"
  ];
  var MERGE = [
    { key: "elem", en: "Elemental damage", zh: "元素傷害", short: {
      WeaponFireDamageMod: ["Heat", "火焰"],
      WeaponFreezeDamageMod: ["Cold", "冰凍"],
      WeaponToxinDamageMod: ["Toxin", "毒素"],
      WeaponElectricityDamageMod: ["Electricity", "電擊"]
    } },
    { key: "phys", en: "Physical damage", zh: "物理傷害", short: {
      WeaponImpactDamageMod: ["Impact", "衝擊"],
      WeaponArmorPiercingDamageMod: ["Puncture", "穿刺"],
      WeaponSlashDamageMod: ["Slash", "切割"]
    } },
    { key: "fac", en: "Faction damage", zh: "派系傷害", short: {
      WeaponFactionDamageCorpus: ["Corpus", "Corpus"],
      WeaponFactionDamageGrineer: ["Grineer", "Grineer"],
      WeaponFactionDamageInfested: ["Infested", "Infested"],
      WeaponMeleeFactionDamageCorpus: ["Corpus", "Corpus"],
      WeaponMeleeFactionDamageGrineer: ["Grineer", "Grineer"],
      WeaponMeleeFactionDamageInfested: ["Infested", "Infested"]
    } }
  ];

  // src/i18n.ts
  var en = {
    eyebrow: "Warframe · Riven Splicer",
    "theme-auto": "Auto",
    "theme-light": "Light",
    "theme-dark": "Dark",
    "theme-group": "Theme",
    clear: "Clear",
    title: "Riven Splice Calculator",
    lede: "Since the Riven Splicer arrived, finding out what a splice will give has meant digging through old riven calculators or the wiki’s formula tables, and most old calculators still use the retired per-weapon disposition. This page does the math for you. Enter the two traits on your riven to see the spliced value, or set a target to see how high each trait needs to roll. A splice never rerolls: it keeps the better roll of the two traits it consumes.",
    "h-riven": "Your Riven",
    "h-riven-sub": "Kitguns use the Pistol table, Zaws the Melee table.",
    rtype: "Riven type",
    rank: "Rank",
    layout: "Buffs + curses",
    "disp-hint": "Disposition is fixed at ●●●●○ 1.2× since 44.1.3",
    "h-recipe": "Recipe",
    "recipes-n": (n, m, type) => `${n} recipes on ${type} rivens` + (m ? ` · ${m} not possible` : ""),
    "h-calc": "Splice",
    "h-calc-sub": "Type the number shown on your riven. The sign doesn’t matter.",
    buff: "Buff",
    curse: "Curse",
    "range-buff": (a, b) => `Possible as buff: ${a} to ${b}`,
    "range-curse": (a, b) => `Possible as curse: ${a} to ${b}`,
    "why-pos": "This trait only rolls as a buff.",
    "why-slot": "This layout has no curse slot.",
    "why-one": "The other trait is already the curse.",
    "roll-empty": "Enter a value to read its roll.",
    "roll-buff": (w) => `Roll ×${w}`,
    "roll-curse": (w) => `Roll ×${w}. On a curse a bigger number is a higher roll, and the splice uses that roll.`,
    "roll-err": (lo, hi) => `Out of range for this riven (${lo} to ${hi}). Check the riven type, rank and buff/curse count.`,
    "roll-bad": "Not a number.",
    "win": "Higher roll, carried into the splice.",
    "out-empty": "Enter at least one trait value.",
    "out-why-both": (n, w) => `Takes ${n}’s roll ×${w}.`,
    "out-why-one": (n, w) => `At least this, from ${n}’s roll ×${w}. Enter the other trait too: a higher roll there wins.`,
    "out-span": (a, b) => `Rounding of the shown values allows ${a} to ${b}.`,
    "out-range": (a, b) => `Spliced range on this riven: ${a} to ${b}`,
    "h-map": "Roll map",
    "h-map-sub": "All three scales line up by roll, ticked at the 0th, 25th, 50th, 75th and 100th percentile, so the ends are the min and max. Hover or tap to read across.",
    target: "Target spliced value",
    "target-out": (p, a, q, b) => `Needs <span class="c1">${p}</span> at <b>${a}</b> or beyond, or <span class="c2">${q}</span> at <b>${b}</b> or beyond.`,
    "target-any": (m) => `Every roll reaches it. The lowest possible splice is <b>${m}</b>.`,
    "target-no": (m) => `Not reachable on this riven. The best possible splice is <b>${m}</b>. More rank or a 2 buff + 1 curse layout raises it.`,
    "target-bad": "Enter a number.",
    "lg-roll": "Roll multiplier ×0.90 to ×1.10",
    "lg-cur": "Your splice",
    "lg-in": "Your traits",
    "nomo-desc": "Three aligned scales showing trait 1, trait 2 and the spliced value for each roll from ×0.90 to ×1.10.",
    "h-reach": "Reach table",
    "h-reach-sub": "Same roll, three numbers. Read a row across.",
    roll: "Roll",
    pct: "Roll percentile",
    "reach-note": "On a curse a bigger number is a higher roll, so the harshest curse gives the best splice.",
    "h-all": "All recipes on this riven",
    "h-all-sub": "Ranges with both inputs as buffs, at the rank and layout above.",
    spliced: "Spliced",
    from: "From",
    "na-pool": (n) => `${n} can’t roll on this riven type`,
    "na-class": "Not offered for this weapon class",
    g_elem: "Elements",
    g_fac: "Faction",
    g_gen: "General",
    g_ranged: "Ranged",
    g_melee: "Melee",
    "tab-splice": "Splice",
    "tab-ranges": "Trait ranges",
    "h-ranges": "Trait ranges",
    "ranges-sub": (type, k) => `Every trait a ${type} riven can roll, at rank and layout above (${k}).`,
    pin: "Pin",
    "pin-label": (n) => `Pin ${n} to the top`,
    "roll-val": "Your value",
    "roll-val-label": (n) => `Value of ${n} on your riven`,
    "roll-oor": "Out of range",
    "roll-lock": "Lock this",
    "roll-tie": "Tied",
    attr: "Trait",
    "buff-r": "As buff",
    "curse-r": "As curse",
    "splice-to": "Splices into",
    "b-col": "Base b",
    "no-curse": "No curse slot",
    "ranges-note": `<p>Ranges run from roll ×0.90 to ×1.10. Heat, Cold, Toxin, Electricity, Melee Damage, Punch Through, Initial Combo and Additional Combo Count Chance only roll as buffs; Chance to Gain Combo Count only rolls as a curse.</p><p>Elemental, physical and faction traits with the same value share one row. Ranged Puncture is a hair lower than Impact and Slash (b 0.01333 vs 0.013333), so the physical row shows the widest range of the three. Physical traits usually need the weapon to have more than 25% of that damage type.</p><p>Highlighted rows are the recipe picked on the Splice tab. Tick the box on the left to pin a row to the top; pins are remembered.</p><p>Rolled two good traits that don’t splice together? Type each number in Your value to read its roll percentile. The value alone tells a buff from a curse, using the rank and layout above. With two or more filled in, the highest roll is marked as the one to lock, since a splice keeps the better roll. On a curse a bigger number is a higher roll.</p>`,
    foot: `<p><b>Formula.</b> <code>v = b × 10 × (rank + 1) × D × L × W</code>, computed step by step in 32-bit floats. D = 1.2 for every weapon since disposition was retired in 44.1.3. L is <span class="nw">0.99 / 1.2375 / 0.75 / 0.9375</span> for a buff on a <span class="nw">2+0 / 2+1 / 3+0 / 3+1</span> riven, and <span class="nw">−0.495 / −0.75</span> for the curse on <span class="nw">2+1 / 3+1</span>. <span class="nw">W = 0.9 + 0.2u</span> runs from 0.90 to 1.10. A spliced trait takes the larger W of the two consumed traits and uses the buff L with its own <code>b</code>. The buff/curse layout never changes when you splice.</p>
<p><b>Rounding.</b> The game rounds what it shows, so a typed value maps to a narrow band of rolls. When that band changes the spliced number, the card shows the band. The game also computes in 32-bit floats; expect the last digit to differ now and then.</p>
<p><b>Sources.</b> Formula, recipes, trait coefficients and trait pools from the <a href="https://wiki.warframe.com/w/Riven_Mods#Overview_Table" target="_blank" rel="noopener">Warframe wiki</a>. Vintage companion traits and per-weapon physical damage limits are not modelled.</p>`
  };
  var zh = {
    eyebrow: "Warframe · 紫卡拼接器",
    "theme-auto": "自動",
    "theme-light": "淺色",
    "theme-dark": "深色",
    "theme-group": "主題",
    clear: "清除",
    title: "紫卡拼接計算機",
    lede: "拼接器推出後，想知道一張紫卡拼下去會變幾 %，往往得翻舊的紫卡計算機或 wiki 的公式表自己算，而舊計算機多半還在用已經退役的武器傾向。這頁直接幫你算好：輸入紫卡上兩條屬性的數字，就能看到拼接後的數值；設定想要的目標值，則會列出兩條屬性各要洗到多少。拼接不會重新擲值，而是沿用兩條屬性中擲值較好的那一條。",
    "h-riven": "你的紫卡",
    "h-riven-sub": "組合槍套手槍係數，Zaw 套近戰係數。",
    rtype: "紫卡類型",
    rank: "等級",
    layout: "正面＋負面",
    "disp-hint": "44.1.3 起傾向固定為 ●●●●○ 1.2×",
    "h-recipe": "配方",
    "recipes-n": (n, m, type) => `${type}紫卡可用 ${n} 條配方` + (m ? `・${m} 條不可能` : ""),
    "h-calc": "拼接",
    "h-calc-sub": "照紫卡上顯示的數字輸入，正負號不影響。",
    buff: "正面",
    curse: "負面",
    "range-buff": (a, b) => `正面可能範圍：${a} 到 ${b}`,
    "range-curse": (a, b) => `負面可能範圍：${a} 到 ${b}`,
    "why-pos": "這條屬性只會是正面。",
    "why-slot": "這個配置沒有負面槽。",
    "why-one": "另一條已經是負面。",
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
    "h-map": "擲值對照圖",
    "h-map-sub": "三條刻度依擲值對齊，刻度標在第 0、25、50、75、100 百分位，兩端就是最小和最大值。滑過或點按即可讀值。",
    target: "目標拼接值",
    "target-out": (p, a, q, b) => `需要「<span class="c1">${p}</span>」達到 <b>${a}</b> 以上，或「<span class="c2">${q}</span>」達到 <b>${b}</b> 以上（以絕對值計）。`,
    "target-any": (m) => `任何擲值都達得到。最低拼接值是 <b>${m}</b>。`,
    "target-no": (m) => `這張紫卡達不到。最高拼接值是 <b>${m}</b>。提高等級或改成 2 正 1 負才能拉高。`,
    "target-bad": "請輸入數字。",
    "lg-roll": "擲值倍率 ×0.90 到 ×1.10",
    "lg-cur": "你的拼接",
    "lg-in": "你的屬性",
    "nomo-desc": "三條對齊的刻度，顯示擲值 ×0.90 到 ×1.10 時屬性一、屬性二與拼接後的數值。",
    "h-reach": "對照表",
    "h-reach-sub": "同一個擲值對應的三個數字，橫著讀。",
    roll: "擲值",
    pct: "擲值百分位",
    "reach-note": "負面屬性數字越大代表擲值越高，所以最重的負面反而拼得最好。",
    "h-all": "這張紫卡的所有配方",
    "h-all-sub": "兩條輸入都當正面計算，套用上方的等級與條數。",
    spliced: "拼接",
    from: "來源",
    "na-pool": (n) => `這種紫卡不會出現「${n}」`,
    "na-class": "這個武器類別沒有這條配方",
    g_elem: "元素",
    g_fac: "派系",
    g_gen: "通用",
    g_ranged: "遠程",
    g_melee: "近戰",
    "tab-splice": "拼接計算",
    "tab-ranges": "屬性範圍",
    "h-ranges": "屬性範圍",
    "ranges-sub": (type, k) => `${type}紫卡可能出現的所有屬性，套用上方的等級與條數（${k}）。`,
    pin: "置頂",
    "pin-label": (n) => `把「${n}」置頂`,
    "roll-val": "你的數值",
    "roll-val-label": (n) => `紫卡上「${n}」的數值`,
    "roll-oor": "超出範圍",
    "roll-lock": "鎖這條",
    "roll-tie": "同分",
    attr: "屬性",
    "buff-r": "正面範圍",
    "curse-r": "負面範圍",
    "splice-to": "可拼接成",
    "b-col": "基礎係數 b",
    "no-curse": "沒有負面槽",
    "ranges-note": `<p>範圍是擲值 ×0.90 到 ×1.10。火焰、冰凍、毒素、電擊、近戰傷害、穿透、起始連擊數、額外連擊數機率只會是正面；機率獲得連擊數只會是負面。</p><p>數值相同的元素、物理、派系傷害各併成一列。遠程的穿刺係數比衝擊、切割略低（b 0.01333 對 0.013333），所以物理那列的範圍取三者最寬。物理傷害通常要武器該傷害類型超過 25% 才洗得出來。</p><p>標色的列是「拼接計算」分頁目前選的配方。勾選左側方塊可把該列置頂，會記住。</p><p>洗出兩條好屬性、但兩條拼不起來時，在「你的數值」輸入紫卡上的數字就能看擲值百分位。會依上方的等級與條數，從數值自動判斷是正面還是負面。填了兩條以上時，擲值最高的那條會標出來當鎖定建議，因為拼接保留的是較好的擲值。負面屬性的數字越大代表擲值越高。</p>`,
    foot: `<p><b>公式。</b><code>v = b × 10 × (等級 + 1) × D × L × W</code>，以 32 位元浮點逐步計算。傾向在 44.1.3 退役後，所有武器 D = 1.2。正面的 L 在 <span class="nw">2+0 / 2+1 / 3+0 / 3+1</span> 時為 <span class="nw">0.99 / 1.2375 / 0.75 / 0.9375</span>，負面在 <span class="nw">2+1 / 3+1</span> 時為 <span class="nw">−0.495 / −0.75</span>。<span class="nw">W = 0.9 + 0.2u</span>，介於 0.90 與 1.10。拼接屬性取兩條被消耗屬性中較大的 W，以自己的 <code>b</code> 套正面的 L。拼接不會改變正負面配置。</p>
<p><b>四捨五入。</b>遊戲顯示的數值有四捨五入，所以輸入值對應的是一小段擲值；這段範圍若會影響拼接結果，卡片會標出來。遊戲用 32 位元浮點運算，最後一位偶爾會差一點。</p>
<p><b>來源。</b>公式、配方、屬性係數與各類型可出現的屬性皆取自 <a href="https://wiki.warframe.com/w/Riven_Mods#Overview_Table" target="_blank" rel="noopener">Warframe wiki</a>。未處理同伴紫卡的舊版屬性，以及個別武器的物理傷害限制。</p>`
  };
  var I18N = { en, zh };
  var LANG_KEY = "riven-splice-lang";
  var lang = "zh";
  function restoreLang() {
    try {
      const l = localStorage.getItem(LANG_KEY);
      if (l === "en" || l === "zh") lang = l;
    } catch {
    }
  }
  function setLang(l) {
    lang = l;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
    }
  }
  function tr(key, ...args) {
    const v = I18N[lang][key];
    return typeof v === "function" ? v(...args) : v;
  }
  var nm = (o) => o[lang];

  // src/state.ts
  var STORE_KEY = "riven-splice-v2";
  var state = {
    type: 0,
    lvl: 8,
    buffs: 2,
    curses: 1,
    recipe: "wpcrit-ms",
    roles: ["buff", "buff"],
    vals: ["", ""],
    target: "",
    example: true,
    tab: "splice",
    pins: [],
    rolls: {}
  };
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch {
    }
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (s && typeof s === "object") {
        for (const k of Object.keys(state)) if (k in s && k !== "lvl") Object.assign(state, { [k]: s[k] });
        return true;
      }
    } catch {
    }
    return false;
  }

  // src/calc.ts
  var isMelee = (t) => RIVEN_TYPES[t].col === 4;
  function resolveTag(tag, t) {
    if (tag === "DMG") return isMelee(t) ? "WeaponMeleeDamageMod" : "WeaponDamageAmountMod";
    if (tag in FACTION_REFS) {
      const f = FACTION_REFS[tag];
      return isMelee(t) ? `WeaponMeleeFactionDamage${f}` : `WeaponFactionDamage${f}`;
    }
    return tag;
  }
  function recipeTags(r, t) {
    return [resolveTag(r.a, t), resolveTag(r.b, t)];
  }
  function recipeBlock(r, t) {
    if (SPLICED[r.out].b[RIVEN_TYPES[t].col] == null) return tr("na-class");
    for (const tag of recipeTags(r, t)) if (BASE[tag][t] == null) return tr("na-pool", nm(TRAITS[tag]));
    return null;
  }
  var f32 = Math.fround;
  var wOf = (u) => f32(0.9 + f32(0.2 * u));
  var layoutKey = (s) => `${s.buffs}+${s.curses}`;
  var baseOf = (tag, t) => BASE[tag][t];
  function scaleWith(b, L, s) {
    return f32(f32(f32(f32(b * 10) * (s.lvl + 1)) * DISPOSITION) * L);
  }
  function buffScale(b, s) {
    return scaleWith(b, L_BUFF[layoutKey(s)], s);
  }
  function curseScale(b, s) {
    return scaleWith(b, L_CURSE[layoutKey(s)], s);
  }
  function traitScale(tag, role, s) {
    const b = baseOf(tag, s.type);
    return role === "curse" ? curseScale(b, s) : buffScale(b, s);
  }
  function splicedScale(out, s) {
    return Math.abs(buffScale(SPLICED[out].b[RIVEN_TYPES[s.type].col], s));
  }
  var val = (sc, w) => f32(sc * w);
  function dispNum(unit, v) {
    return unit === "%" ? v * 100 : unit === "x" ? 1 + v : v;
  }
  function fmt(unit, v, signed) {
    const d = dispNum(unit, v);
    if (unit === "x") return "×" + d.toFixed(2);
    const sign = signed && d > 0 ? "+" : "";
    return sign + d.toFixed(1) + (unit === "%" ? "%" : unit === "n" ? "" : unit);
  }
  var halfStep = (unit) => unit === "%" ? 5e-4 : unit === "x" ? 5e-3 : 0.05;
  var isMult = (n) => n >= 0.3 && n <= 2;
  function parseMag(unit, str) {
    const s = String(str).replace(/[×x%,\s+]/gi, (c) => c === "," ? "." : "").trim();
    if (s === "" || s === "-") return null;
    const n = Number(s);
    if (!isFinite(n)) return NaN;
    if (unit === "%") return Math.abs(n) / 100;
    if (unit === "x") return isMult(n) ? Math.abs(n - 1) : Math.abs(n) / 100;
    return Math.abs(n);
  }
  function rollOf(mag, tag, role, s) {
    const sc = Math.abs(traitScale(tag, role, s));
    const h = halfStep(TRAITS[tag].unit);
    const uOf = (m) => (m / sc - 0.9) / 0.2;
    const lo = Math.max(0, uOf(Math.max(0, mag - h))), hi = Math.min(1, uOf(mag + h));
    if (lo > hi) return { kind: "out" };
    return { kind: "ok", lo, hi, u: Math.min(1, Math.max(0, uOf(mag))) };
  }
  function readTrait(i, tag, s) {
    const mag = parseMag(TRAITS[tag].unit, s.vals[i]);
    if (mag === null) return { kind: "empty" };
    if (Number.isNaN(mag)) return { kind: "bad" };
    return rollOf(mag, tag, s.roles[i], s);
  }
  function typedCurse(unit, str) {
    const n = Number(String(str).replace(/[×x%\s+]/gi, "").replace(",", "."));
    return unit === "x" && isMult(n) ? n < 1 : n < 0;
  }
  function readAnyRole(str, tag, s) {
    const m = TRAITS[tag], mag = parseMag(m.unit, str);
    if (mag === null) return { kind: "empty" };
    if (Number.isNaN(mag)) return { kind: "bad" };
    const roles = [...m.curseOnly ? [] : ["buff"], ...m.pos || s.curses === 0 ? [] : ["curse"]];
    const hits = roles.flatMap((role) => {
      const rd = rollOf(mag, tag, role, s);
      return rd.kind === "ok" ? [{ ...rd, role }] : [];
    });
    if (!hits.length) return { kind: "out" };
    return hits.find((x) => x.role === (typedCurse(m.unit, str) ? "curse" : "buff")) ?? hits[0];
  }
  function currentRecipe() {
    let r = RECIPES.find((x) => x.id === state.recipe);
    if (!r || recipeBlock(r, state.type)) {
      r = RECIPES.find((x) => !recipeBlock(x, state.type));
      state.recipe = r.id;
    }
    return r;
  }
  function fixRoles(tags) {
    for (let i = 0; i < 2; i++) {
      if (state.curses === 0 || TRAITS[tags[i]].pos) state.roles[i] = "buff";
    }
    if (state.roles[0] === "curse" && state.roles[1] === "curse") state.roles[1] = "buff";
  }
  function setExampleValues(r) {
    const tags = recipeTags(r, state.type);
    const us = [0.35, 0.75];
    state.vals = tags.map((tag, i) => {
      const v = val(traitScale(tag, state.roles[i], state), wOf(us[i]));
      const d = dispNum(TRAITS[tag].unit, v);
      return TRAITS[tag].unit === "x" ? d.toFixed(2) : d.toFixed(1);
    });
  }
  function compute() {
    const s = state, r = currentRecipe(), tags = recipeTags(r, s.type);
    fixRoles(tags);
    const traits = tags.map((tag, i) => {
      const sc = traitScale(tag, s.roles[i], s);
      return { tag, role: s.roles[i], unit: TRAITS[tag].unit, sc, read: readTrait(i, tag, s) };
    });
    const outSc = splicedScale(r.out, s);
    const rs = traits.map((x) => x.read).filter((x) => x.kind === "ok");
    const both = rs.length === 2;
    const win = both ? rs[0].u >= rs[1].u ? 0 : 1 : rs.length ? traits.findIndex((x) => x.read.kind === "ok") : -1;
    const roll = rs.length ? { u: Math.max(...rs.map((x) => x.u)), lo: Math.max(...rs.map((x) => x.lo)), hi: Math.max(...rs.map((x) => x.hi)) } : null;
    return { r, traits, outSc, outUnit: SPLICED[r.out].unit, win, both, roll };
  }

  // src/dom.ts
  var $ = (id) => document.getElementById(id);
  var closest = (e, sel) => e.target.closest(sel);

  // src/nomo.ts
  var SVGNS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, text) {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, String(attrs[k]));
    if (text != null) n.textContent = text;
    return n;
  }
  var NOMO = { L: 168, R: 736, rows: [86, 146, 206] };
  var PCTS = [0, 0.25, 0.5, 0.75, 1];
  var xOf = (u) => NOMO.L + (NOMO.R - NOMO.L) * u;
  var lastRows = null;
  var ghostU = null;
  function renderNomo(c, need) {
    const svg = $("nomo");
    [...svg.querySelectorAll(":scope > :not(desc)")].forEach((n) => n.remove());
    const rows = [
      { cls: 1, y: NOMO.rows[0], sc: c.traits[0].sc, unit: c.traits[0].unit, name: nm(TRAITS[c.traits[0].tag]), sub: tr(c.traits[0].role) },
      { cls: 2, y: NOMO.rows[1], sc: c.traits[1].sc, unit: c.traits[1].unit, name: nm(TRAITS[c.traits[1].tag]), sub: tr(c.traits[1].role) },
      { cls: 3, y: NOMO.rows[2], sc: c.outSc, unit: c.outUnit, name: nm(SPLICED[c.r.out]), sub: tr("spliced") }
    ];
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
    const under = el("g", {});
    svg.appendChild(under);
    for (const row of rows) {
      const { y } = row;
      svg.appendChild(el("text", { x: 12, y: y - 2, class: "lab" }, row.name.length > 22 ? row.name.slice(0, 21) + "…" : row.name));
      svg.appendChild(el("text", { x: 12, y: y + 13, class: "sub" }, row.sub));
      svg.appendChild(el("line", { x1: NOMO.L, x2: NOMO.R, y1: y, y2: y, class: `band band${row.cls}` }));
      for (const u of PCTS) {
        const x = xOf(u);
        svg.appendChild(el("line", { x1: x, x2: x, y1: y - 5, y2: y + 5, class: "tick" }));
        svg.appendChild(el("text", { x, y: y + 19, "text-anchor": "middle" }, fmt(row.unit, val(row.sc, wOf(u)), true)));
      }
    }
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
    const g = el("g", { id: "ghost" });
    svg.appendChild(g);
    svg.appendChild(el("rect", { x: NOMO.L - 10, y: 10, width: NOMO.R - NOMO.L + 20, height: 230, class: "hit" }));
    lastRows = rows;
    drawGhost();
  }
  function drawGhost() {
    const g = $("ghost");
    if (!g || !lastRows) return;
    g.replaceChildren();
    if (ghostU == null) return;
    const x = xOf(ghostU);
    g.appendChild(el("line", { x1: x, x2: x, y1: 26, y2: NOMO.rows[2] + 6, class: "ghost" }));
    g.appendChild(el("text", { x: x + (ghostU > 0.85 ? -8 : 8), y: 64, "text-anchor": ghostU > 0.85 ? "end" : "start", class: "gval" }, `p${Math.round(ghostU * 100)} · ×${wOf(ghostU).toFixed(3)}`));
    for (const row of lastRows) {
      g.appendChild(el("circle", { cx: x, cy: row.y, r: 4, class: `d${row.cls}` }));
      const t = el(
        "text",
        { x: x + (ghostU > 0.85 ? -8 : 8), y: row.y - 9, "text-anchor": ghostU > 0.85 ? "end" : "start", class: "val" },
        fmt(row.unit, val(row.sc, wOf(ghostU)), true)
      );
      g.appendChild(t);
    }
  }
  function nomoPointer(ev) {
    const r = $("nomo").getBoundingClientRect();
    const vx = (ev.clientX - r.left) / r.width * 760;
    ghostU = Math.min(1, Math.max(0, (vx - NOMO.L) / (NOMO.R - NOMO.L)));
    drawGhost();
  }
  function bindNomo() {
    const svg = $("nomo");
    svg.addEventListener("pointermove", nomoPointer);
    svg.addEventListener("pointerdown", nomoPointer);
    const clearGhost = () => {
      ghostU = null;
      drawGhost();
    };
    svg.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") clearGhost();
    });
    svg.addEventListener("pointercancel", clearGhost);
  }

  // src/ranges.ts
  function traitName(tag, t) {
    if (tag === "WeaponFireRateMod" && !isMelee(t)) return lang === "zh" ? "射速（弓類加倍）" : "Fire Rate (x2 for Bows)";
    if (tag === "WeaponCritChanceMod" && isMelee(t)) return lang === "zh" ? "暴擊機率（重擊 x 2）" : "Critical Chance (x2 for Heavy Attacks)";
    return nm(TRAITS[tag]);
  }
  function renderRanges(c) {
    const s = state, t = s.type;
    const uses = {};
    for (const r of RECIPES) {
      if (recipeBlock(r, t)) continue;
      for (const tag of recipeTags(r, t)) {
        const m = uses[tag] ??= /* @__PURE__ */ new Map();
        if (!m.has(r.out)) m.set(r.out, r.id);
      }
    }
    const present = RANGE_ORDER.filter((tag) => BASE[tag][t] != null);
    const items = [], done = /* @__PURE__ */ new Set();
    for (const tag of present) {
      if (done.has(tag)) continue;
      const g = MERGE.find((m) => tag in m.short);
      const close = (a, b) => Math.abs(a - b) <= 1e-3 * Math.abs(b);
      const mates = g ? present.filter((x) => x in g.short && close(baseOf(x, t), baseOf(tag, t))) : [tag];
      mates.forEach((x) => done.add(x));
      const sep = lang === "zh" ? "／" : " / ";
      const merged = g && mates.length > 1 ? g : null;
      const name = merged ? `${nm(merged)}（${mates.map((x) => merged.short[x][lang === "zh" ? 1 : 0]).join(sep)}）` : traitName(tag, t);
      items.push({ key: merged ? merged.key : tag, tag, tags: mates, name });
    }
    const pins = new Set(s.pins);
    const ordered = [...items.filter((x) => pins.has(x.key)), ...items.filter((x) => !pins.has(x.key))];
    const nPinned = ordered.filter((x) => pins.has(x.key)).length;
    const pick = new Set(c.traits.map((x) => x.tag));
    const range = (tag, scs) => {
      const m = TRAITS[tag], sign = m.neg ? -1 : 1;
      const byMag = [...scs].sort((a, b) => Math.abs(a) - Math.abs(b));
      return `${fmt(m.unit, sign * val(byMag[0], 0.9), true)} – ${fmt(m.unit, sign * val(byMag[byMag.length - 1], 1.1), true)}`;
    };
    const dash = `<span class="muted">—</span>`;
    const rows = ordered.map((it, i) => {
      const { tag } = it, m = TRAITS[tag], bs = it.tags.map((x) => baseOf(x, t));
      const buff = m.curseOnly ? dash : range(tag, bs.map((b2) => buffScale(b2, s)));
      const curse = m.pos ? dash : s.curses === 0 ? `<span class="muted">${tr("no-curse")}</span>` : range(tag, bs.map((b2) => curseScale(b2, s)));
      const b = [...new Set(bs)].join(" / ");
      const outs = /* @__PURE__ */ new Map();
      for (const x of it.tags) for (const [out, id] of uses[x] ?? []) if (!outs.has(out)) outs.set(out, id);
      const to = [...outs].map(([out, id]) => `<button type="button" class="pick" data-r="${id}">${nm(SPLICED[out])}</button>`).join(lang === "zh" ? "、" : ", ");
      const on = pins.has(it.key);
      const cls = [it.tags.some((x) => pick.has(x)) ? "sel" : "", on ? "pinned" : "", on && i === nPinned - 1 ? "pin-end" : ""].join(" ").trim();
      return `<tr class="${cls}"><td class="pin"><input type="checkbox" class="pinbox" data-k="${it.key}" aria-label="${tr("pin-label", it.name)}"${on ? " checked" : ""}></td><td>${it.name}</td><td class="rollc"><div class="inrow${m.unit === "x" ? " pre" : ""}"><input type="text" class="rollin" id="roll-${it.key}" data-k="${it.key}" data-tag="${tag}" inputmode="decimal" autocomplete="off" aria-label="${tr("roll-val-label", it.name)}"${m.unit === "x" ? ' placeholder="1.12"' : ""}><span class="unit">${m.unit === "x" ? "×" : m.unit === "n" ? "" : m.unit}</span><button type="button" class="clr" data-for="roll-${it.key}" aria-label="${tr("clear")}" title="${tr("clear")}" hidden>✕</button></div><div class="rollout"></div></td><td class="num">${buff}</td><td class="num">${curse}</td><td class="uses">${to}</td><td class="num b">${b}</td></tr>`;
    });
    $("ranges").innerHTML = `<thead><tr><th class="pin">${tr("pin")}</th><th>${tr("attr")}</th><th>${tr("roll-val")}<button type="button" class="rollclr" id="rolls-clear" hidden>${tr("clear")}</button></th><th class="num">${tr("buff-r")}</th><th class="num">${tr("curse-r")}</th><th>${tr("splice-to")}</th><th class="num b">${tr("b-col")}</th></tr></thead><tbody>${rows.join("")}</tbody>`;
    $("ranges-sub").textContent = tr("ranges-sub", nm(RIVEN_TYPES[t]), `${s.lvl} · ${layoutKey(s)}`);
    renderRolls();
  }
  function renderRolls() {
    const s = state;
    const rows = [...$("ranges").querySelectorAll(".rollin")].map((inp) => {
      const str = s.rolls[inp.dataset.k] ?? "";
      if (document.activeElement !== inp) inp.value = str;
      inp.parentElement.querySelector(".clr").hidden = !str;
      return { str, row: inp.closest("tr"), box: inp.closest("td").querySelector(".rollout"), rd: readAnyRole(str, inp.dataset.tag, s) };
    });
    const read = rows.map((x) => x.rd).filter((rd) => rd.kind === "ok");
    const top = read.length > 1 ? read.reduce((a, b) => b.u > a.u ? b : a) : null;
    const best = new Set(top ? read.filter((rd) => rd.hi >= top.lo) : []);
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
        box.innerHTML = `<b>${p}</b> ×${wOf(rd.u).toFixed(3)} · ${tr(rd.role)}` + (on ? `<b class="lock">${tr(best.size === 1 ? "roll-lock" : "roll-tie")}</b>` : "");
      }
    }
    $("rolls-clear").hidden = !rows.some((x) => x.str);
  }

  // src/theme.ts
  var THEME_KEY = "riven-splice-theme";
  function currentTheme() {
    const t = document.documentElement.dataset.theme;
    return t === "light" || t === "dark" ? t : "auto";
  }
  function showTheme() {
    const t = currentTheme();
    for (const b of document.querySelectorAll(".theme button")) b.setAttribute("aria-pressed", String(b.dataset.themeSet === t));
  }
  function setTheme(t) {
    if (t === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
    try {
      if (t === "auto") localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, t);
    } catch {
    }
    showTheme();
  }

  // src/render.ts
  function applyI18n() {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-t]").forEach((n) => {
      n.innerHTML = tr(n.dataset.t);
    });
    $("foot").innerHTML = tr("foot");
    $("nomo-desc").textContent = tr("nomo-desc");
    for (const b of document.querySelectorAll(".lang button")) b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    $("theme-group").setAttribute("aria-label", tr("theme-group"));
    for (const b of document.querySelectorAll(".clr")) {
      b.setAttribute("aria-label", tr("clear"));
      b.title = tr("clear");
    }
    showTheme();
    $("rtype").innerHTML = RIVEN_TYPES.map((t, i) => `<option value="${i}">${nm(t)}</option>`).join("");
    $("lvl").innerHTML = Array.from({ length: 9 }, (_, i) => `<option value="${i}">${i}</option>`).join("");
  }
  function renderSetup() {
    $("rtype").value = String(state.type);
    $("lvl").value = String(state.lvl);
    $("layout").innerHTML = LAYOUTS.map(([b, c]) => `<button type="button" data-b="${b}" data-c="${c}" aria-pressed="${state.buffs === b && state.curses === c}">${b}+${c}</button>`).join("");
    const k = layoutKey(state);
    $("layout-hint").textContent = `L ${lang === "zh" ? "正面" : "buff"} ${L_BUFF[k]}` + (L_CURSE[k] ? ` · ${lang === "zh" ? "負面" : "curse"} ${L_CURSE[k]}` : "");
  }
  function renderChips() {
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
  function renderCalc(c) {
    c.traits.forEach((x, i) => {
      $(`t${i}-name`).textContent = nm(TRAITS[x.tag]);
      const why = TRAITS[x.tag].pos ? "why-pos" : state.curses === 0 ? "why-slot" : c.traits[1 - i].role === "curse" ? "why-one" : null;
      const canCurse = !why;
      $(`t${i}-role`).innerHTML = ["buff", "curse"].map((role) => `<button type="button" data-i="${i}" data-role="${role}" aria-pressed="${x.role === role}"${role === "curse" && !canCurse ? ` aria-disabled="true" title="${tr(why)}"` : ""}>${tr(role)}</button>`).join("");
      const inp = $(`t${i}-val`);
      if (document.activeElement !== inp) inp.value = state.vals[i];
      inp.placeholder = x.unit === "x" ? x.role === "curse" ? "0.88" : "1.12" : "";
      $(`t${i}-unit`).textContent = x.unit === "x" ? "×" : x.unit;
      inp.parentElement.classList.toggle("pre", x.unit === "x");
      inp.parentElement.querySelector(".clr").hidden = !state.vals[i];
      const lo = fmt(x.unit, val(x.sc, 0.9), true), hi = fmt(x.unit, val(x.sc, 1.1), true);
      $(`t${i}-range`).textContent = tr(x.role === "curse" ? "range-curse" : "range-buff", lo, hi);
      if (why) $(`t${i}-range`).insertAdjacentHTML("beforeend", `<span class="why">${tr(why)}</span>`);
      const box = $(`t${i}-roll`), rd = x.read;
      box.className = "roll";
      if (rd.kind === "empty") box.textContent = tr("roll-empty");
      else if (rd.kind === "bad") {
        box.className = "roll err";
        box.textContent = tr("roll-bad");
      } else if (rd.kind === "out") {
        box.className = "roll err";
        box.textContent = tr("roll-err", lo, hi);
      } else {
        const w = wOf(rd.u).toFixed(3);
        box.innerHTML = (x.role === "curse" ? tr("roll-curse", w) : tr("roll-buff", w)) + (c.both && c.win === i ? `<br><b>${tr("win")}</b>` : "");
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
  function renderTarget(c) {
    const out = $("target-out"), u = c.outUnit;
    $("target-unit").textContent = u === "x" ? "×" : u;
    const inp = $("target");
    inp.parentElement.classList.toggle("pre", u === "x");
    inp.parentElement.querySelector(".clr").hidden = !state.target;
    if (document.activeElement !== inp) inp.value = state.target;
    inp.placeholder = fmt(u, c.outSc, false).replace(/[×%+]/g, "");
    const mag = parseMag(u, state.target);
    if (mag === null) {
      out.innerHTML = "";
      return null;
    }
    if (Number.isNaN(mag)) {
      out.textContent = tr("target-bad");
      return null;
    }
    const need = (mag / c.outSc - 0.9) / 0.2;
    if (need > 1) {
      out.innerHTML = tr("target-no", fmt(u, val(c.outSc, 1.1), true));
      return null;
    }
    if (need <= 0) {
      out.innerHTML = tr("target-any", fmt(u, val(c.outSc, 0.9), true));
      return 0;
    }
    const [x, y] = c.traits;
    out.innerHTML = tr("target-out", nm(TRAITS[x.tag]), fmtNeed(x, need), nm(TRAITS[y.tag]), fmtNeed(y, need));
    return need;
  }
  function fmtNeed(x, u) {
    const v = val(x.sc, wOf(u)), h = halfStep(x.unit) * 2;
    const m = Math.ceil(Math.abs(v) / h - 1e-9) * h;
    return fmt(x.unit, Math.sign(v) * m, true);
  }
  function renderLegend() {
    $("legend").innerHTML = `<span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="var(--raised)" stroke="var(--ink2)" stroke-width="2"/></svg>${tr("lg-in")}</span><span><svg width="14" height="14" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="var(--s3)"/></svg>${tr("lg-cur")}</span><span><svg width="22" height="14" aria-hidden="true"><line x1="1" x2="21" y1="7" y2="7" stroke="var(--ink3)" stroke-dasharray="4 3"/></svg>${tr("target")}</span>`;
  }
  function renderReach(c) {
    const [x, y] = c.traits, u = c.outUnit;
    const at = c.roll && wOf(c.roll.u);
    const near = at != null ? REACH_W.reduce((best, w, i) => Math.abs(w - at) < Math.abs(REACH_W[best] - at) ? i : best, 0) : -1;
    const head = `<thead><tr><th class="num">${tr("roll")}</th><th class="num c1">${nm(TRAITS[x.tag])} <span class="muted">(${tr(x.role)})</span></th><th class="num c2">${nm(TRAITS[y.tag])} <span class="muted">(${tr(y.role)})</span></th><th class="num c3">${nm(SPLICED[c.r.out])}</th></tr></thead>`;
    const body = REACH_W.map((w, i) => `<tr class="${i === near ? "hl" : ""}"><td class="num">×${w.toFixed(2)}</td><td class="num">${fmt(x.unit, val(x.sc, w), true)}</td><td class="num">${fmt(y.unit, val(y.sc, w), true)}</td><td class="num"><b>${fmt(u, val(c.outSc, w), true)}</b></td></tr>`).join("");
    $("reach").innerHTML = head + "<tbody>" + body + "</tbody>";
  }
  function renderAll(c) {
    const s = state, t = s.type;
    const head = `<thead><tr><th>${tr("spliced")}</th><th>${tr("from")}</th><th class="num">${lang === "zh" ? "屬性一" : "Trait 1"}</th><th class="num">${lang === "zh" ? "屬性二" : "Trait 2"}</th><th class="num">${tr("spliced")}</th></tr></thead>`;
    const rows = RECIPES.map((r) => {
      const why = recipeBlock(r, t);
      const out = nm(SPLICED[r.out]);
      if (why) return { na: true, html: `<tr class="na"><td>${out}</td><td colspan="4">${why}</td></tr>` };
      const [a, b] = recipeTags(r, t);
      const ra = (tag) => {
        const sc = buffScale(baseOf(tag, t), s), un = TRAITS[tag].unit;
        return `${fmt(un, val(sc, 0.9), true)} – ${fmt(un, val(sc, 1.1), true)}`;
      };
      const osc = splicedScale(r.out, s), ou = SPLICED[r.out].unit;
      return { html: `<tr class="${r.id === c.r.id ? "sel" : ""}"><td><button type="button" class="pick" data-r="${r.id}">${out}</button></td><td>${nm(TRAITS[a])} + ${nm(TRAITS[b])}</td><td class="num">${ra(a)}</td><td class="num">${ra(b)}</td><td class="num"><b>${fmt(ou, val(osc, 0.9), true)} – ${fmt(ou, val(osc, 1.1), true)}</b></td></tr>` };
    });
    $("all").innerHTML = head + "<tbody>" + rows.filter((r) => !r.na).map((r) => r.html).join("") + rows.filter((r) => r.na).map((r) => r.html).join("") + "</tbody>";
  }
  function showTab() {
    if (state.tab !== "ranges") state.tab = "splice";
    for (const b of document.querySelectorAll(".tab")) b.setAttribute("aria-selected", String(b.dataset.tab === state.tab));
    $("panel-splice").hidden = state.tab !== "splice";
    $("panel-ranges").hidden = state.tab !== "ranges";
  }
  function render() {
    renderSetup();
    renderChips();
    const r = currentRecipe();
    fixRoles(recipeTags(r, state.type));
    if (state.example) setExampleValues(r);
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

  // src/main.ts
  function selectRecipe(id) {
    if (id === state.recipe) return;
    state.recipe = id;
    state.roles = ["buff", "buff"];
    state.target = "";
    setExampleValues(currentRecipe());
    state.example = true;
    render();
  }
  function init() {
    const had = load();
    restoreLang();
    if (!had) setExampleValues(currentRecipe());
    if (location.hash === "#ranges") state.tab = "ranges";
    applyI18n();
    renderLegend();
    render();
    $("lang-en").onclick = $("lang-zh").onclick = (e) => {
      setLang(e.currentTarget.dataset.lang);
      applyI18n();
      renderLegend();
      render();
    };
    document.addEventListener("click", (e) => {
      const b = closest(e, ".clr");
      if (!b) return;
      const inp = $(b.dataset.for);
      inp.value = "";
      inp.dispatchEvent(new Event("input", { bubbles: true }));
      inp.focus();
    });
    $("theme-group").addEventListener("click", (e) => {
      const b = closest(e, "button");
      if (b) setTheme(b.dataset.themeSet);
    });
    new MutationObserver(showTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const rtype = $("rtype"), lvl = $("lvl");
    rtype.onchange = () => {
      state.type = +rtype.value;
      render();
    };
    const tabs = document.querySelector(".tabs");
    tabs.addEventListener("click", (e) => {
      const b = closest(e, ".tab");
      if (!b) return;
      state.tab = b.dataset.tab;
      showTab();
      save();
    });
    $("ranges").addEventListener("change", (e) => {
      const box = closest(e, ".pinbox");
      if (!box) return;
      const k = box.dataset.k;
      state.pins = box.checked ? [...state.pins.filter((x) => x !== k), k] : state.pins.filter((x) => x !== k);
      renderRanges(compute());
      save();
      $("ranges").querySelector(`.pinbox[data-k="${k}"]`)?.focus();
    });
    $("ranges").addEventListener("input", (e) => {
      const inp = closest(e, ".rollin");
      if (!inp) return;
      const k = inp.dataset.k;
      if (inp.value) state.rolls[k] = inp.value;
      else delete state.rolls[k];
      renderRolls();
      save();
    });
    $("ranges").addEventListener("click", (e) => {
      if (e.target.id === "rolls-clear") {
        state.rolls = {};
        renderRolls();
        save();
        return;
      }
      const b = closest(e, ".pick");
      if (!b) return;
      state.tab = "splice";
      selectRecipe(b.dataset.r);
      showTab();
      save();
      $("groups").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
    tabs.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      state.tab = state.tab === "splice" ? "ranges" : "splice";
      showTab();
      save();
      $(`tab-${state.tab}`).focus();
    });
    lvl.onchange = () => {
      state.lvl = +lvl.value;
      render();
    };
    $("layout").addEventListener("click", (e) => {
      const b = closest(e, "button");
      if (!b) return;
      state.buffs = +b.dataset.b;
      state.curses = +b.dataset.c;
      render();
    });
    $("groups").addEventListener("click", (e) => {
      const b = closest(e, ".chip");
      if (b) selectRecipe(b.dataset.r);
    });
    $("all").addEventListener("click", (e) => {
      const b = closest(e, ".pick");
      if (!b) return;
      selectRecipe(b.dataset.r);
      $("groups").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
    for (const i of [0, 1]) {
      $(`t${i}-role`).addEventListener("click", (e) => {
        const b = closest(e, "button");
        if (!b || b.getAttribute("aria-disabled") === "true") return;
        const role = b.dataset.role;
        state.roles[i] = role;
        if (role === "curse") state.roles[1 - i] = "buff";
        if (state.example) setExampleValues(currentRecipe());
        render();
      });
      const inp = $(`t${i}-val`);
      inp.addEventListener("input", () => {
        state.vals[i] = inp.value;
        state.example = false;
        render();
      });
    }
    const target = $("target");
    target.addEventListener("input", () => {
      state.target = target.value;
      render();
    });
    bindNomo();
  }
  init();
})();
