import { ROOT_HIDDEN } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * ハンバーガーメニューを非表示にする
 * @param props プロパティ
 */
export function hidden(props: BattleHamburgerMenuProps): void {
  props.root.className = ROOT_HIDDEN;
}
