import { ROOT } from "../dom/class-name";
import { extractHamburgerIcon, extractMenu } from "../dom/extract-element";
import { BattleHamburgerMenuProps } from "../props";
import { rootInnerHTML, RootInnerHTMLParams } from "./root-inner-html";

/** BattleHamburgerMenuProps生成パラメーター */
export type BattleHamburgerMenuPropsCreatorParams = RootInnerHTMLParams;

/**
 * BattleHamburgerMenuPropsを生成する
 * @param params 生成パラメーター
 * @returns 生成結果
 */
export function createBattleHamburgerMenuProps(
  params: BattleHamburgerMenuPropsCreatorParams,
): BattleHamburgerMenuProps {
  const root = document.createElement("div");
  root.className = ROOT;
  root.innerHTML = rootInnerHTML(params);

  const hamburgerIcon = extractHamburgerIcon(root);
  const menu = extractMenu(root);

  return { root, hamburgerIcon, menu };
}
