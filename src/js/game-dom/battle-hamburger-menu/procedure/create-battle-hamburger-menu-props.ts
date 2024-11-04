import { ROOT } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";
import { rootInnerHTML } from "./root-inner-html";

/**
 * BattleHamburgerMenuPropsを生成する
 * @returns 生成結果
 */
export function createBattleHamburgerMenuProps(): BattleHamburgerMenuProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML();
  return { root };
}
