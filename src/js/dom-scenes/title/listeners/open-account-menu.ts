import { ACCOUNT_MENU_CLASS } from "../dom/class-name";
import type { TitleProps } from "../props";

/**
 * アカウントメニューを開くヘルパー関数
 * @param props 画面プロパティ
 */
export function openAccountMenu(props: TitleProps): void {
  props.accountMenu.className = ACCOUNT_MENU_CLASS;
}
