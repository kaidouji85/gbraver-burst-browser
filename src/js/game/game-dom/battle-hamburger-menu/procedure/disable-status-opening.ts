import { BattleHamburgerMenuProps } from "../props";

/**
 * ステータスを開く系の項目を選択不可にする
 * @param props プロパティ
 */
export function disableStatusOpening(props: BattleHamburgerMenuProps) {
  props.canStatusOpening = false;
}
