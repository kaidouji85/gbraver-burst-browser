// @flow
import type {TitleProps} from "../props";

import { INVISIBLE_ACCOUNT_MENU_CLASS } from "../doms";

/**
 * アカウントメニューを閉じるヘルパー関数
 * 
 * @param props 画面プロパティ
 */
export function closeAccountMenu(props: TitleProps): void {
  props.isAccountMenuOpen = false;
  props.accountMenu.className = INVISIBLE_ACCOUNT_MENU_CLASS;
}