import { HELP_MENU_CLASS } from "../dom/class-name";
import { TitleProps } from "../props";

/**
 * ヘルプメニューを開くヘルパー関数
 * @param props 画面プロパティ
 */
export function openHelpMenu(props: TitleProps): void {
  props.helpMenu.className = HELP_MENU_CLASS;
}
