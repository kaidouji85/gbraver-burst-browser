import { HELP_MENU } from "../dom/class-name";
import { TitleProps } from "../props";

/**
 * ヘルプメニューを表示しているか否かを判定する
 * @param props 画面プロパティ
 * @return 判定結果、trueでヘルプメニューを表示している
 */
export function isHelpMenuOpen(props: Readonly<TitleProps>): boolean {
  return props.helpMenu.className === HELP_MENU;
}