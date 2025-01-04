import { ACCOUNT_MENU_CLASS } from "../dom/class-name";
import { TitleProps } from "../props";

/**
 * アカウントメニューを表示しているか否かを判定する
 * @param props 画面プロパティ
 * @returns 判定結果、trueでアカウントメニューを表示している
 */
export function isAccountMenuOpen(props: Readonly<TitleProps>): boolean {
  return props.accountMenu.className === ACCOUNT_MENU_CLASS;
}
