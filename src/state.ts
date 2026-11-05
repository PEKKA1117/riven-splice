// 頁面狀態與 localStorage 存取
export type Role = "buff" | "curse";
export type Tab = "splice" | "ranges";
export interface State {
  type: number; lvl: number; buffs: number; curses: number;
  recipe: string; roles: Role[]; vals: string[]; target: string;
  example: boolean; tab: Tab; pins: string[]; rolls: Record<string, string>;
}

const STORE_KEY = "riven-splice-v2";
export const state: State = {
  type: 0, lvl: 8, buffs: 2, curses: 1,
  recipe: "wpcrit-ms", roles: ["buff", "buff"], vals: ["", ""], target: "",
  example: true, tab: "splice", pins: [], rolls: {},
};
export function save(): void {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* 私密視窗等情況 */ }
}
export function load(): boolean {
  try {
    const s: unknown = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (s && typeof s === "object") {
      // 等級不還原：每次開啟都從 8 級開始
      for (const k of Object.keys(state)) if (k in s && k !== "lvl") Object.assign(state, { [k]: (s as Record<string, unknown>)[k] });
      return true;
    }
  } catch { /* 忽略 */ }
  return false;
}
