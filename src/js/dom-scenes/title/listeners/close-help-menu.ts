import { INVISIBLE__HELP_MENU_CLASS } from "../dom/class-name";
import { TitleProps } from "../props";

/**
 * ヘルプメニューを閉じるヘルパー関数
 * @param props 画面プロパティ
 */
export function closeHelpMenu(props: TitleProps): void {
  props.helpMenu.className = INVISIBLE__HELP_MENU_CLASS;
}
