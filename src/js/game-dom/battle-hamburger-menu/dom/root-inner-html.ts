import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import {
  BACKGROUND_HIDDEN,
  END_BATTLE_CONFIRM_DIALOG_HIDDEN,
  MENU_HIDDEN,
  RETRY_CONFIRM_DIALOG_HIDDEN,
  ROOT,
} from "./class-name";
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
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT,
    BACKGROUND_HIDDEN,
    MENU_HIDDEN,
    RETRY_CONFIRM_DIALOG_HIDDEN,
    END_BATTLE_CONFIRM_DIALOG_HIDDEN,
    battleHamburgerMenuPath,
    closerPath,
  });
}
