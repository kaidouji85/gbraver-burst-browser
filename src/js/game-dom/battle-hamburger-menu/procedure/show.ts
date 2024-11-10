import { ROOT } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * ハンバーガーメニューを表示する
 * @param props プロパティ
 */
export function show(props: BattleHamburgerMenuProps): void {
  props.root.className = ROOT;
}
