import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { MENU_HIDDEN, ROOT } from "../dom/class-name";
import template from "./root-inner-html.hbs";

/** innerHTML生成パラメーター */
export type RootInnerHTMLParams = ResourcesContainer;

/**
 * ルート要素のinnerHTMLを生成する
 * @returns 生成結果
 */
export function rootInnerHTML(params: RootInnerHTMLParams): string {
  const { resources } = params;
  const battleHamburgerMenuPath =
    resources.paths.find((p) => p.id === PathIds.BATTLE_HAMBURGER_MENU)?.path ??
    "";
  return template({
    ROOT,
    MENU_HIDDEN,
    battleHamburgerMenuPath,
  });
}
