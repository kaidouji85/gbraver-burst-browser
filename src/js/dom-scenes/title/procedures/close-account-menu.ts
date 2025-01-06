import { INVISIBLE_ACCOUNT_MENU_CLASS } from "../dom/class-name";
import type { TitleProps } from "../props";

/**
 * アカウントメニューを閉じるヘルパー関数
 * @param props 画面プロパティ
 */
export function closeAccountMenu(props: TitleProps): void {
  props.accountMenu.className = INVISIBLE_ACCOUNT_MENU_CLASS;
}
