import { HELP_MENU } from "../dom/class-name";
import { TitleProps } from "../props";

/**
 * ヘルプメニューを開くヘルパー関数
 * @param props 画面プロパティ
 */
export function openHelpMenu(props: TitleProps): void {
  props.helpMenu.className = HELP_MENU;
}